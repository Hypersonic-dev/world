import Link from "next/link";
import { ArrowRight, Shield, Cloud, Server } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 text-orange-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Trusted IT Partner in the UK
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Innovative{" "}
              <span className="text-orange-400">IT Solutions</span>{" "}
              for Modern Business
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-lg">
              Terrabyte Ltd delivers enterprise-grade technology solutions
              tailored for growing businesses. From managed IT support to
              cloud migration and cybersecurity – we power your digital journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
              >
                Explore Services
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
              >
                Get a Free Consultation
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: Shield, label: "ISO 27001 Certified" },
                { icon: Cloud, label: "Microsoft Gold Partner" },
                { icon: Server, label: "24/7 UK Support" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-blue-200 text-sm">
                  <Icon size={16} className="text-orange-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Visual card stack */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-md">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Shield size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Cybersecurity</p>
                    <p className="text-blue-200 text-xs">Advanced Threat Protection</p>
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <div className="bg-orange-400 h-2 rounded-full w-4/5" />
                </div>
                <p className="text-blue-200 text-xs">Security Score: 98/100</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Cloud size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Cloud Migration</p>
                    <p className="text-blue-200 text-xs">Azure & AWS Specialists</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["99.9%", "2x Speed", "40% Cost"].map((stat) => (
                    <div key={stat} className="bg-white/10 rounded-lg p-2 text-center">
                      <p className="text-white text-xs font-bold">{stat}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <Server size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Managed IT Support</p>
                    <p className="text-blue-200 text-xs">Response time under 4 hours</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-green-500/20 text-green-300 text-xs font-medium px-2 py-0.5 rounded-full">
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path
            d="M0,60 L0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,60 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
