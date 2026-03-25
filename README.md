# Smart Irrigation System - ESP32

A standalone MicroPython-based smart irrigation system for ESP32, using only built-in modules — no external dependencies required.

## Features

- **Soil moisture monitoring** via ADC sensor with configurable dry/wet calibration
- **Automatic irrigation** triggered when moisture drops below a target level
- **Manual pump control** via web dashboard
- **Reservoir status detection** by checking moisture change after pump activation
- **Wi-Fi Access Point mode** — connect directly to the device at `http://192.168.4.1`
- **Web dashboard** with live status, settings, calibration, and event log
- **Persistent configuration** saved to flash (`/config.json`)

## Hardware

| Component | Pin |
|-----------|-----|
| Soil moisture sensor (ADC) | GPIO 32 |
| Pump relay | GPIO 26 |
| Status LED | GPIO 22 |

## Getting Started

1. Flash MicroPython to your ESP32.
2. Copy `main.py` to the device root (e.g. via `ampy` or Thonny).
3. Power on the device — it will create a Wi-Fi AP named `SmartIrrigation`.
4. Connect to the AP and open `http://192.168.4.1` in your browser.
5. Use the **Calibration** section to calibrate the soil sensor (dry reading, then wet reading).
6. Adjust target moisture, irrigation interval and pump duration in **Settings**.

## Configuration

Default values (stored in `/config.json` after first save):

| Key | Default | Description |
|-----|---------|-------------|
| `device_name` | `SmartIrrigation` | AP SSID |
| `soil_dry_value` | `3000` | ADC value for dry soil |
| `soil_wet_value` | `1000` | ADC value for wet soil |
| `target_moisture` | `60` | Target moisture % |
| `irrigation_interval` | `3600` | Seconds between auto-irrigations |
| `pump_duration` | `5` | Seconds the pump runs per cycle |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Web dashboard |
| `/api/status` | GET | Current sensor & pump status (JSON) |
| `/api/pump/on` | GET | Turn pump on (auto-stops after `pump_duration`) |
| `/api/pump/off` | GET | Turn pump off |
| `/api/settings/save` | POST | Save settings (JSON body) |
| `/api/logs` | GET | Recent event log (JSON) |
| `/api/reservoir` | GET | Reservoir status (JSON) |
| `/api/config` | GET | Current configuration (JSON) |
| `/api/calibrate/dry` | GET | Take dry soil ADC reading |
| `/api/calibrate/wet` | GET | Take wet soil ADC reading |
| `/api/calibrate/finish` | POST | Save calibration values (JSON body) |