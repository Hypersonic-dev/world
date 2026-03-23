import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "UK-based team with local engineers available on-site",
  "Dedicated account manager for every client",
  "Transparent, fixed-fee pricing with no hidden costs",
  "ISO 27001 certified – security you can trust",
  "Average ticket response time under 4 hours",
  "Scalable solutions that grow with your business",
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">
                Powering businesses since 2009
              </h3>
              <p className="text-blue-100 leading-relaxed mb-8">
                From a small helpdesk team in London, we have grown into a
                full-service IT solutions provider trusted by over 500 companies
                across the United Kingdom.
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "500+", label: "Active Clients" },
                  { value: "£50M+", label: "IT Projects Delivered" },
                  { value: "50+", label: "Expert Engineers" },
                  { value: "4.9★", label: "Client Satisfaction" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="bg-white/10 rounded-xl p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-orange-300">
                      {value}
                    </p>
                    <p className="text-blue-200 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-orange-500 text-white rounded-2xl px-5 py-3 shadow-lg hidden sm:block">
              <p className="font-bold text-lg leading-none">ISO</p>
              <p className="text-xs opacity-90">27001 Certified</p>
            </div>
          </div>

          {/* Right – Benefits */}
          <div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your technology, our priority
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We don&apos;t just fix problems – we build long-term technology
              partnerships. Our proactive approach means we identify and resolve
              issues before they impact your business.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-orange-500 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
