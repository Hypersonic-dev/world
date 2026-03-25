"""
Smart Irrigation System - ESP32 Standalone (Simplified)
All built-in MicroPython modules, no external dependencies
"""

import machine
import network
import json
import time
import os
import gc
from machine import ADC, Pin, Timer
import socket
import _thread

print("=" * 60)
print("SMART IRRIGATION SYSTEM - ESP32")
print("=" * 60)

# ==============================================================================
# CONFIGURATION
# ==============================================================================

CONFIG_FILE = '/config.json'
DEFAULT_CONFIG = {
    'device_name': 'SmartIrrigation',
    'soil_dry_value': 3000,           # ADC value when soil is dry
    'soil_wet_value': 1000,           # ADC value when soil is wet
    'target_moisture': 60,            # Target moisture percentage
    'irrigation_interval': 3600,      # Pump activation interval in seconds (1 hour)
    'pump_duration': 5,               # How long to run pump in seconds
    'moisture_unit': '%',             # Display unit
}

# Pins
SOIL_MOISTURE_PIN = 32
PUMP_PIN = 26
LED_PIN = 22

# ==============================================================================
# EVENT LOGGING
# ==============================================================================

class EventLog:
    def __init__(self, max_events=25):
        self.events = []
        self.max_events = max_events
    
    def add(self, event_type, message):
        """Add an event to the log"""
        timestamp = time.time()
        event = {
            'timestamp': timestamp,
            'type': event_type,
            'message': message
        }
        self.events.insert(0, event)
        if len(self.events) > self.max_events:
            self.events = self.events[:self.max_events]
        print(f"[LOG] {event_type}: {message}")
    
    def get_logs(self, limit=50):
        """Get recent logs"""
        return self.events[:limit]
    
    def format_time(self, timestamp):
        """Format timestamp to readable string"""
        import utime
        return utime.ctime(int(timestamp))

# ==============================================================================
# FILE MANAGER
# ==============================================================================

def read_config():
    """Read WiFi config"""
    try:
        if CONFIG_FILE in os.listdir('/'):
            with open(CONFIG_FILE, 'r') as f:
                config = json.load(f)
                result = DEFAULT_CONFIG.copy()
                result.update(config)
                return result
    except Exception:
        pass
    return DEFAULT_CONFIG.copy()

def write_config(config):
    """Save config"""
    try:
        with open(CONFIG_FILE, 'w') as f:
            json.dump(config, f)
        print("✓ Config saved")
        return True
    except Exception as e:
        print(f"✗ Config save error: {e}")
        return False

# ==============================================================================
# HARDWARE
# ==============================================================================

class Hardware:
    def __init__(self):
        print("\n[HARDWARE] Initializing...")
        try:
            self.adc = ADC(Pin(SOIL_MOISTURE_PIN))
            self.adc.atten(ADC.ATTN_11DB)
            print("  ✓ ADC initialized")
        except Exception as e:
            print(f"  ✗ ADC error: {e}")
        
        try:
            self.pump = Pin(PUMP_PIN, Pin.OUT)
            self.pump.off()
            print("  ✓ Pump pin initialized")
        except Exception as e:
            print(f"  ✗ Pump error: {e}")
        
        try:
            self.led = Pin(LED_PIN, Pin.OUT)
            self.led.off()
            print("  ✓ LED initialized")
        except Exception as e:
            print(f"  ✗ LED error: {e}")
    
    def read_moisture(self, config):
        """Read moisture sensor using calibrated values"""
        try:
            raw = self.adc.read()
            dry_val = config.get('soil_dry_value', 3000)
            wet_val = config.get('soil_wet_value', 1000)
            moisture = max(0, min(100, (dry_val - raw) / (dry_val - wet_val) * 100))
            return round(moisture, 1)
        except Exception:
            return 0
    
    def pump_on(self):
        try:
            self.pump.on()
        except Exception:
            pass
    
    def pump_off(self):
        try:
            self.pump.off()
        except Exception:
            pass
    
    def led_on(self):
        try:
            self.led.on()
        except Exception:
            pass
    
    def led_off(self):
        try:
            self.led.off()
        except Exception:
            pass

# ==============================================================================
# SYSTEM STATE
# ==============================================================================

class SystemState:
    def __init__(self, config, hardware, event_log):
        self.config = config
        self.hardware = hardware
        self.event_log = event_log
        # Check if calibrated (not default values)
        self.calibrated = (config.get('soil_dry_value', 3000) != 3000 or 
                          config.get('soil_wet_value', 1000) != 1000)
        self.state = {
            'moisture': 0,
            'moisture_raw': 0,
            'pump_status': False,
            'last_pump_time': 0,
            'reservoir_status': 'checking',
            'reservoir_check_active': False,
        }
        self.last_pump_activation = 0
        print(f"\n[STATE] System state initialized (Calibrated: {self.calibrated})")
        self.event_log.add('SYSTEM', 'System initialized')

# ==============================================================================
# ACCESS POINT MANAGER (AP-ONLY MODE)
# ==============================================================================

class APManager:
    def __init__(self, config):
        print("\n[AP] Initializing Access Point...")
        self.config = config
        self.ap = network.WLAN(network.AP_IF)
        self.start_ap()
    
    def start_ap(self):
        """Start AP for local access only"""
        try:
            self.ap.active(True)
            self.ap.config(essid=self.config['device_name'], authmode=network.AUTH_OPEN)
            print(f"  [AP] SSID: {self.config['device_name']}")
            print(f"  [AP] IP: 192.168.4.1")
            print(f"  [AP] Access at: http://192.168.4.1")
            return True
        except Exception as e:
            print(f"  [AP] Error: {e}")
            return False
    
    def get_ip(self):
        """Get AP IP"""
        try:
            if self.ap.active():
                return '192.168.4.1'
        except Exception:
            pass
        return '0.0.0.0'

# ==============================================================================
# SIMPLE HTTP SERVER
# ==============================================================================

class SimpleServer:
    def __init__(self, state, ap_manager, port=80):
        self.state = state
        self.ap_manager = ap_manager
        self.port = port
        self.running = False
        self.calibration_mode = False
        self.dry_reading = 0
        self.wet_reading = 0
        self.reservoir_check_active = False
        self.pre_pump_moisture = 0
    
    def get_html(self):
        """Generate minimal dashboard HTML"""
        config = self.state.config
        is_cal = config.get('soil_dry_value', 3000) != 3000 or config.get('soil_wet_value', 1000) != 1000
        moisture = self.state.state.get('moisture', 0)
        pump_status = self.state.state.get('pump_status', False)
        target_moisture = config.get('target_moisture', 60)
        irrigation_interval = config.get('irrigation_interval', 3600)
        pump_duration = config.get('pump_duration', 5)
        reservoir_status = self.state.state.get('reservoir_status', 'checking')
        raw_adc = self.state.state.get('moisture_raw', 0)
        dry_val = config.get('soil_dry_value', 3000)
        wet_val = config.get('soil_wet_value', 1000)

        pump_color = '#e74c3c' if pump_status else '#2ecc71'
        pump_label = 'ON' if pump_status else 'OFF'
        reservoir_color = '#2ecc71' if reservoir_status == 'full' else ('#e74c3c' if reservoir_status == 'empty' else '#f39c12')
        cal_warning = '' if is_cal else '<div style="background:#f39c12;color:#fff;padding:10px;border-radius:6px;margin-bottom:16px;">⚠ Sensor not calibrated. Use calibration below for accurate readings.</div>'

        html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Smart Irrigation</title>
  <style>
    body {{ font-family: Arial, sans-serif; background: #f0f4f8; margin: 0; padding: 16px; }}
    h1 {{ color: #2c3e50; margin-bottom: 8px; }}
    .card {{ background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }}
    .badge {{ display: inline-block; padding: 4px 12px; border-radius: 12px; color: #fff; font-weight: bold; }}
    .row {{ display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 8px; }}
    .stat {{ flex: 1; min-width: 120px; background: #ecf0f1; border-radius: 6px; padding: 10px; text-align: center; }}
    .stat-val {{ font-size: 2em; font-weight: bold; color: #2c3e50; }}
    .stat-label {{ font-size: 0.85em; color: #7f8c8d; }}
    button {{ padding: 8px 18px; border: none; border-radius: 6px; cursor: pointer; font-size: 1em; margin: 4px; }}
    .btn-green {{ background: #2ecc71; color: #fff; }}
    .btn-red {{ background: #e74c3c; color: #fff; }}
    .btn-blue {{ background: #3498db; color: #fff; }}
    input[type=number] {{ width: 80px; padding: 6px; border-radius: 4px; border: 1px solid #ccc; }}
    label {{ font-size: 0.95em; }}
    table {{ width: 100%; border-collapse: collapse; font-size: 0.9em; }}
    th, td {{ text-align: left; padding: 6px 8px; border-bottom: 1px solid #ecf0f1; }}
    th {{ color: #7f8c8d; font-weight: normal; }}
    #log-body tr:nth-child(even) {{ background: #f9f9f9; }}
  </style>
</head>
<body>
  <h1>🌱 Smart Irrigation</h1>
  {cal_warning}

  <div class="card">
    <b>System Status</b>
    <div class="row" style="margin-top:10px;">
      <div class="stat">
        <div class="stat-val" id="moisture-val">{moisture}%</div>
        <div class="stat-label">Soil Moisture</div>
      </div>
      <div class="stat">
        <div class="stat-val" id="raw-val">{raw_adc}</div>
        <div class="stat-label">Raw ADC</div>
      </div>
      <div class="stat">
        <span class="badge" style="background:{pump_color}" id="pump-badge">{pump_label}</span>
        <div class="stat-label">Pump</div>
      </div>
      <div class="stat">
        <span class="badge" style="background:{reservoir_color}" id="res-badge">{reservoir_status}</span>
        <div class="stat-label">Reservoir</div>
      </div>
    </div>
    <div>Target: <b>{target_moisture}%</b> &nbsp;|&nbsp; Interval: <b>{irrigation_interval}s</b> &nbsp;|&nbsp; Duration: <b>{pump_duration}s</b></div>
  </div>

  <div class="card">
    <b>Manual Pump Control</b><br><br>
    <button class="btn-green" onclick="pumpOn()">▶ Pump ON</button>
    <button class="btn-red" onclick="pumpOff()">■ Pump OFF</button>
    <span id="pump-msg" style="margin-left:10px;font-size:0.9em;"></span>
  </div>

  <div class="card">
    <b>Settings</b><br><br>
    <label>Target Moisture (%): <input type="number" id="s-target" value="{target_moisture}" min="0" max="100"></label><br><br>
    <label>Irrigation Interval (s): <input type="number" id="s-interval" value="{irrigation_interval}" min="60"></label><br><br>
    <label>Pump Duration (s): <input type="number" id="s-duration" value="{pump_duration}" min="1"></label><br><br>
    <button class="btn-blue" onclick="saveSettings()">💾 Save Settings</button>
    <span id="settings-msg" style="margin-left:10px;font-size:0.9em;"></span>
  </div>

  <div class="card">
    <b>Sensor Calibration</b>
    <p style="font-size:0.9em;color:#7f8c8d;">Calibrate: place sensor in dry soil, click Dry; place in water, click Wet; then Save.</p>
    <button class="btn-blue" onclick="calDry()">🌵 Read Dry</button>
    <button class="btn-blue" onclick="calWet()">💧 Read Wet</button>
    <button class="btn-green" onclick="calFinish()">✔ Save Calibration</button>
    <div style="margin-top:8px;font-size:0.9em;">
      Dry reading: <b id="dry-val">{dry_val}</b> &nbsp;|&nbsp; Wet reading: <b id="wet-val">{wet_val}</b>
    </div>
    <span id="cal-msg" style="font-size:0.9em;"></span>
  </div>

  <div class="card">
    <b>Event Log</b>
    <table><thead><tr><th>Time</th><th>Type</th><th>Message</th></tr></thead>
    <tbody id="log-body"></tbody></table>
    <button class="btn-blue" style="margin-top:8px;" onclick="loadLogs()">🔄 Refresh Logs</button>
  </div>

  <script>
    var _dryReading = {dry_val};
    var _wetReading = {wet_val};

    function pumpOn() {{
      fetch('/api/pump/on').then(function(r){{ document.getElementById('pump-msg').textContent = r.ok ? 'Pump started.' : 'Error.'; }});
    }}
    function pumpOff() {{
      fetch('/api/pump/off').then(function(r){{ document.getElementById('pump-msg').textContent = r.ok ? 'Pump stopped.' : 'Error.'; }});
    }}
    function saveSettings() {{
      var data = {{
        target_moisture: parseInt(document.getElementById('s-target').value),
        irrigation_interval: parseInt(document.getElementById('s-interval').value),
        pump_duration: parseInt(document.getElementById('s-duration').value)
      }};
      fetch('/api/settings/save', {{method:'POST', body:JSON.stringify(data)}})
        .then(function(r){{ return r.json(); }})
        .then(function(d){{ document.getElementById('settings-msg').textContent = d.success ? '✓ Saved' : ('Error: ' + d.error); }});
    }}
    function calDry() {{
      fetch('/api/calibrate/dry').then(function(r){{ return r.json(); }}).then(function(d){{
        _dryReading = d.reading;
        document.getElementById('dry-val').textContent = d.reading;
        document.getElementById('cal-msg').textContent = 'Dry reading saved: ' + d.reading;
      }});
    }}
    function calWet() {{
      fetch('/api/calibrate/wet').then(function(r){{ return r.json(); }}).then(function(d){{
        _wetReading = d.reading;
        document.getElementById('wet-val').textContent = d.reading;
        document.getElementById('cal-msg').textContent = 'Wet reading saved: ' + d.reading;
      }});
    }}
    function calFinish() {{
      fetch('/api/calibrate/finish', {{method:'POST', body:JSON.stringify({{dry_value:_dryReading, wet_value:_wetReading}})}})
        .then(function(r){{ return r.json(); }})
        .then(function(d){{ document.getElementById('cal-msg').textContent = d.success ? '✓ Calibration saved!' : ('Error: ' + d.error); }});
    }}
    function loadLogs() {{
      fetch('/api/logs').then(function(r){{ return r.json(); }}).then(function(d){{
        var tbody = document.getElementById('log-body');
        tbody.innerHTML = '';
        (d.logs || []).forEach(function(l){{
          var tr = document.createElement('tr');
          tr.innerHTML = '<td>' + l.timestamp + '</td><td>' + l.type + '</td><td>' + l.message + '</td>';
          tbody.appendChild(tr);
        }});
      }});
    }}
    function refreshStatus() {{
      fetch('/api/status').then(function(r){{ return r.json(); }}).then(function(d){{
        document.getElementById('moisture-val').textContent = d.moisture + '%';
        document.getElementById('raw-val').textContent = d.raw_adc;
        var pb = document.getElementById('pump-badge');
        pb.textContent = d.pump_status ? 'ON' : 'OFF';
        pb.style.background = d.pump_status ? '#e74c3c' : '#2ecc71';
      }});
      fetch('/api/reservoir').then(function(r){{ return r.json(); }}).then(function(d){{
        var rb = document.getElementById('res-badge');
        rb.textContent = d.status;
        rb.style.background = d.status === 'full' ? '#2ecc71' : (d.status === 'empty' ? '#e74c3c' : '#f39c12');
      }});
    }}
    loadLogs();
    setInterval(refreshStatus, 3000);
    setInterval(loadLogs, 10000);
  </script>
</body>
</html>"""
        return html
    
    def handle_request(self, request):
        """Handle HTTP request"""
        try:
            lines = request.split('\r\n')
            if not lines:
                return b"HTTP/1.1 400 Bad\r\n\r\n"
            
            request_line = lines[0].split()
            if len(request_line) < 2:
                return b"HTTP/1.1 400 Bad\r\n\r\n"
            
            method, path = request_line[0], request_line[1]
            
            # Parse query parameters
            if '?' in path:
                path_part, query = path.split('?', 1)
                params = {}
                for param in query.split('&'):
                    if '=' in param:
                        k, v = param.split('=', 1)
                        params[k] = v.replace('%20', ' ')
            else:
                path_part = path
                params = {}
            
            # Route handling
            if path_part == '/':
                html = self.get_html()
                response = f"HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Length: {len(html)}\r\n\r\n{html}"
                return response.encode()
            
            elif path_part == '/api/pump/on':
                # Activate pump with configured duration
                duration = self.state.config.get('pump_duration', 5)
                self.state.hardware.pump_on()
                self.state.state['pump_status'] = True
                self.state.event_log.add('PUMP', f'Pump activated for {duration}s')
                
                # Auto-stop after configured duration
                def stop():
                    time.sleep(duration)
                    self.state.hardware.pump_off()
                    self.state.state['pump_status'] = False
                    self.state.event_log.add('PUMP', 'Pump auto-stopped')
                _thread.start_new_thread(stop, ())
                response = "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nOK"
                return response.encode()
            
            elif path_part == '/api/pump/off':
                self.state.hardware.pump_off()
                self.state.state['pump_status'] = False
                self.state.event_log.add('PUMP', 'Pump manual off')
                response = "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nOK"
                return response.encode()
            
            elif path_part == '/api/settings/save' and method == 'POST':
                # Parse JSON body from request
                body_start = request.find('\r\n\r\n')
                if body_start >= 0:
                    body = request[body_start + 4:]
                    try:
                        data = json.loads(body)
                        if 'target_moisture' in data:
                            self.state.config['target_moisture'] = int(data['target_moisture'])
                        if 'irrigation_interval' in data:
                            self.state.config['irrigation_interval'] = int(data['irrigation_interval'])
                        if 'pump_duration' in data:
                            self.state.config['pump_duration'] = int(data['pump_duration'])
                        
                        # Save config to flash
                        write_config(self.state.config)
                        self.state.event_log.add('CONFIG', 'Settings updated')
                        
                        response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n" + json.dumps({
                            'success': True,
                            'message': 'Settings saved'
                        })
                        return response.encode()
                    except Exception as e:
                        response = "HTTP/1.1 400 Bad\r\nContent-Type: application/json\r\n\r\n" + json.dumps({
                            'success': False,
                            'error': str(e)
                        })
                        return response.encode()
                else:
                    response = "HTTP/1.1 400 Bad\r\nContent-Type: text/plain\r\n\r\nNo body"
                    return response.encode()
            
            elif path_part == '/api/logs':
                # Return event logs as JSON
                logs = self.state.event_log.get_logs()
                response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n" + json.dumps({'logs': logs})
                return response.encode()
            
            elif path_part == '/api/status':
                # Return current system status
                raw_adc = self.state.state.get('moisture_raw', 0)
                dry_val = self.state.config.get('soil_dry_value', 3000)
                wet_val = self.state.config.get('soil_wet_value', 1000)
                
                status = {
                    'moisture': self.state.state['moisture'],
                    'pump_status': self.state.state['pump_status'],
                    'target_moisture': self.state.config.get('target_moisture', 60),
                    'irrigation_interval': self.state.config.get('irrigation_interval', 3600),
                    'pump_duration': self.state.config.get('pump_duration', 5),
                    'moisture_unit': self.state.config.get('moisture_unit', '%'),
                    'raw_adc': raw_adc,
                    'dry_cal': dry_val,
                    'wet_cal': wet_val
                }
                response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n" + json.dumps(status)
                return response.encode()
            
            elif path_part == '/api/reservoir':
                # Return reservoir status
                reservoir_status = self.state.state.get('reservoir_status', 'checking')
                response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n" + json.dumps({
                    'status': reservoir_status
                })
                return response.encode()
            
            elif path_part == '/api/config':
                # Return current config (for debugging)
                response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n" + json.dumps({
                    'soil_dry_value': self.state.config.get('soil_dry_value', 3000),
                    'soil_wet_value': self.state.config.get('soil_wet_value', 1000),
                    'target_moisture': self.state.config.get('target_moisture', 60),
                    'irrigation_interval': self.state.config.get('irrigation_interval', 3600),
                    'pump_duration': self.state.config.get('pump_duration', 5),
                })
                return response.encode()
            
            elif path_part == '/api/calibrate/dry':
                # Take dry soil reading (sensor in air)
                dry_reading = self.state.hardware.adc.read()
                self.dry_reading = dry_reading
                self.state.event_log.add('CALIBRATE', f'Dry soil reading: {dry_reading}')
                response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n" + json.dumps({
                    'reading': dry_reading
                })
                return response.encode()
            
            elif path_part == '/api/calibrate/wet':
                # Take wet soil reading (sensor in water)
                wet_reading = self.state.hardware.adc.read()
                self.wet_reading = wet_reading
                self.state.event_log.add('CALIBRATE', f'Wet soil reading: {wet_reading}')
                response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n" + json.dumps({
                    'reading': wet_reading
                })
                return response.encode()
            
            elif path_part == '/api/calibrate/finish' and method == 'POST':
                # Save calibration values
                body_start = request.find('\r\n\r\n')
                if body_start >= 0:
                    body = request[body_start + 4:]
                    try:
                        data = json.loads(body)
                        dry_val = int(data.get('dry_value', 3000))
                        wet_val = int(data.get('wet_value', 1000))
                        
                        # Update config with calibration values
                        self.state.config['soil_dry_value'] = dry_val
                        self.state.config['soil_wet_value'] = wet_val
                        self.state.calibrated = True
                        
                        # Save config to flash
                        write_config(self.state.config)
                        self.state.event_log.add('CALIBRATE', f'Calibration finished: dry={dry_val}, wet={wet_val}')
                        print(f"  [CALIBRATE] System now calibrated and ready for operation")
                        
                        response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n" + json.dumps({
                            'success': True,
                            'message': 'Calibration saved'
                        })
                        return response.encode()
                    except Exception as e:
                        response = "HTTP/1.1 400 Bad\r\nContent-Type: application/json\r\n\r\n" + json.dumps({
                            'success': False,
                            'error': str(e)
                        })
                        return response.encode()
                else:
                    response = "HTTP/1.1 400 Bad\r\nContent-Type: text/plain\r\n\r\nNo body"
                    return response.encode()
            
            else:
                response = "HTTP/1.1 404 Not Found\r\n\r\n"
                return response.encode()
        
        except Exception as e:
            print(f"Request error: {e}")
            return b"HTTP/1.1 500 Server Error\r\n\r\n"
    
    def run(self):
        """Start web server"""
        print(f"\n[SERVER] Starting on port {self.port}...")
        self.running = True
        
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        
        try:
            s.bind(('0.0.0.0', self.port))
            s.listen(5)
            print(f"✓ Server listening on http://{self.ap_manager.get_ip()}:{self.port}")
            
            while self.running:
                try:
                    conn, addr = s.accept()
                    request = conn.recv(4096).decode()
                    response = self.handle_request(request)
                    conn.send(response)
                    conn.close()
                except Exception as e:
                    print(f"Connection error: {e}")
        except Exception as e:
            print(f"Server error: {e}")
        finally:
            s.close()

# ==============================================================================
# SENSOR LOOP
# ==============================================================================

def sensor_loop(state, ap_manager):
    """Read sensors periodically and detect reservoir status"""
    print("\n[SENSORS] Starting sensor loop...")
    while True:
        try:
            # Only run if calibrated
            if not state.calibrated:
                print("  [SENSORS] Waiting for calibration...")
                time.sleep(5)
                continue
            
            # Read soil moisture from ADC
            moisture = state.hardware.read_moisture(state.config)
            state.state['moisture'] = moisture
            state.state['moisture_raw'] = state.hardware.adc.read()
            print(f"  Moisture: {moisture}%")
            
            # Check reservoir status if pump was just activated
            if state.state.get('pump_status') and state.state.get('reservoir_check_active'):
                # Wait a moment for water to reach sensor
                time.sleep(2)
                moisture_after = state.hardware.read_moisture(state.config)
                
                # If moisture increased, water is available
                if moisture_after > moisture:
                    state.state['reservoir_status'] = 'full'
                    state.event_log.add('RESERVOIR', 'Water detected - Reservoir full')
                    print(f"  [RESERVOIR] Water available (moisture increased: {moisture}% -> {moisture_after}%)")
                else:
                    state.state['reservoir_status'] = 'empty'
                    state.event_log.add('RESERVOIR', 'No water detected - Reservoir empty')
                    print(f"  [RESERVOIR] No water detected (moisture stable: {moisture}%)")
                
                state.state['reservoir_check_active'] = False
            
            # Check if irrigation is needed (simple threshold check)
            target_moisture = state.config.get('target_moisture', 60)
            if moisture < target_moisture:
                # Check if enough time has passed since last irrigation
                current_time = time.time()
                last_pump_time = state.state.get('last_pump_time', 0)
                irrigation_interval = state.config.get('irrigation_interval', 3600)
                
                if (current_time - last_pump_time) > irrigation_interval:
                    print(f"  [AUTO] Soil moisture {moisture}% < target {target_moisture}%, starting auto-irrigation")
                    state.hardware.pump_on()
                    state.state['pump_status'] = True
                    state.state['last_pump_time'] = current_time
                    state.state['reservoir_check_active'] = True
                    state.event_log.add('PUMP', f'Auto-irrigation started (moisture: {moisture}%)')
                    
                    # Auto-stop pump after duration
                    duration = state.config.get('pump_duration', 5)
                    _thread.start_new_thread(stop_pump_after, (state, duration))
            
            time.sleep(2)
        except Exception as e:
            print(f"Sensor error: {e}")
            time.sleep(5)

def stop_pump_after(state, duration):
    """Stop pump after specified duration"""
    try:
        time.sleep(duration)
        state.hardware.pump_off()
        state.state['pump_status'] = False
        state.event_log.add('PUMP', 'Auto-irrigation stopped')
    except Exception as e:
        print(f"Pump stop error: {e}")

# ==============================================================================
# MAIN
# ==============================================================================

def main():
    print("\n" + "="*60)
    print("[BOOT] Smart Irrigation System Starting")
    print("="*60 + "\n")
    
    # Load config
    config = read_config()
    print(f"[CONFIG] Device: {config['device_name']}")
    print(f"[CONFIG] Target Moisture: {config.get('target_moisture', 60)}%")
    print(f"[CONFIG] Irrigation Interval: {config.get('irrigation_interval', 3600)}s")
    
    # Initialize hardware
    hardware = Hardware()
    
    # Initialize state with event log
    event_log = EventLog()
    state = SystemState(config, hardware, event_log)
    state.event_log.add('BOOT', 'System starting')
    
    # Initialize AP mode
    print("\n[AP] Starting Access Point...")
    ap_manager = APManager(config)
    ap_manager.start_ap()
    print(f"  SSID: {config['device_name']}")
    print(f"  IP: 192.168.4.1")
    print(f"  Open http://192.168.4.1 in your browser\n")
    state.event_log.add('AP', 'Access point started')
    
    # Turn on LED to indicate ready
    hardware.led_on()
    state.event_log.add('LED', 'LED indicator on')
    
    # Start sensor loop in background
    import _thread
    _thread.start_new_thread(sensor_loop, (state, ap_manager))
    
    # Start web server
    server = SimpleServer(state, ap_manager)
    server.run()

if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()
