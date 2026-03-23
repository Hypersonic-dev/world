"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  return (
    <>
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 pt-32 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-orange-300 font-semibold text-sm uppercase tracking-widest">
            Get in Touch
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 text-blue-200 max-w-xl mx-auto">
            Whether you need IT support, a project quote or just want to learn
            more about what we do – we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                How to reach us
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+44 (0) 800 123 4567",
                    sub: "Mon–Fri 8am–6pm · Emergency: 24/7",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "info@terrabyteltd.com",
                    sub: "We respond within 2 business hours",
                  },
                  {
                    icon: MapPin,
                    label: "Head Office",
                    value: "20 Fenchurch Street",
                    sub: "London, EC3M 3BY, United Kingdom",
                  },
                  {
                    icon: Clock,
                    label: "Support Hours",
                    value: "24/7 for managed clients",
                    sub: "Standard hours Mon–Fri 8am–6pm",
                  },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">
                        {label}
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">{value}</p>
                      <p className="text-gray-500 text-xs">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-10 bg-gray-100 rounded-2xl h-56 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin size={32} className="mx-auto mb-2" />
                  <p className="text-sm">London, EC3M 3BY</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>
              {status === "sent" ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Message sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for getting in touch. We&apos;ll respond within 2
                    business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="Jane"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="Smith"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Business Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="+44 (0)..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent bg-white"
                    >
                      <option value="">Select a service...</option>
                      <option>Managed IT Support</option>
                      <option>Cloud Solutions</option>
                      <option>Cybersecurity</option>
                      <option>Data Management</option>
                      <option>Network Infrastructure</option>
                      <option>Software Development</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form you agree to our{" "}
                    <a href="/privacy" className="text-blue-700 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
