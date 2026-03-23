import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to transform your IT?
        </h2>
        <p className="text-blue-200 max-w-xl mx-auto mb-10">
          Get in touch with our team today for a free, no-obligation
          consultation. We&apos;ll assess your current setup and recommend the best
          path forward.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
          >
            <Mail size={16} />
            Send Us a Message
          </Link>
          <a
            href="tel:+448001234567"
            className="inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
          >
            <Phone size={16} />
            +44 (0) 800 123 4567
          </a>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap justify-center gap-8 text-blue-300 text-sm">
          {[
            "Free Consultation",
            "No Long-Term Contracts",
            "UK-Based Engineers",
            "Same-Day Response",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
