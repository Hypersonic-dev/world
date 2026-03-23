import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

const footerLinks = {
  Services: [
    { label: "IT Support", href: "/services#it-support" },
    { label: "Cloud Solutions", href: "/services#cloud" },
    { label: "Cybersecurity", href: "/services#cybersecurity" },
    { label: "Data Management", href: "/services#data" },
    { label: "Network Infrastructure", href: "/services#network" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/about#careers" },
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/about#case-studies" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Terrabyte<span className="text-orange-500">Ltd</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Empowering businesses with innovative technology solutions. Your
              trusted partner for IT excellence across the UK.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-orange-500 shrink-0" />
                <span>+44 (0) 800 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-orange-500 shrink-0" />
                <span>info@terrabyteltd.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-orange-500 shrink-0 mt-0.5" />
                <span>
                  20 Fenchurch Street, London
                  <br />
                  EC3M 3BY, United Kingdom
                </span>
              </div>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-blue-700 flex items-center justify-center transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm hover:text-orange-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Terrabyte Ltd. All rights reserved.</p>
          <p>Registered in England & Wales. Company No. 12345678</p>
        </div>
      </div>
    </footer>
  );
}
