import Link from "next/link";
import {
  HeadphonesIcon,
  Cloud,
  Shield,
  Database,
  Network,
  Code2,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: HeadphonesIcon,
    title: "Managed IT Support",
    description:
      "Proactive monitoring, helpdesk support and on-site assistance to keep your business running smoothly.",
    color: "bg-blue-100 text-blue-700",
    href: "/services#it-support",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Seamless migration to Azure, AWS or Google Cloud with full management and optimisation.",
    color: "bg-sky-100 text-sky-700",
    href: "/services#cloud",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Comprehensive security audits, threat detection, endpoint protection and compliance consultancy.",
    color: "bg-orange-100 text-orange-700",
    href: "/services#cybersecurity",
  },
  {
    icon: Database,
    title: "Data Management",
    description:
      "Reliable backup solutions, data recovery, GDPR compliance and structured data governance.",
    color: "bg-purple-100 text-purple-700",
    href: "/services#data",
  },
  {
    icon: Network,
    title: "Network Infrastructure",
    description:
      "Design, installation and maintenance of robust wired and wireless network environments.",
    color: "bg-green-100 text-green-700",
    href: "/services#network",
  },
  {
    icon: Code2,
    title: "Software Development",
    description:
      "Bespoke web and mobile applications built with modern frameworks to meet your exact needs.",
    color: "bg-pink-100 text-pink-700",
    href: "/services#software",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            What We Do
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Our Core Services
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We offer a full spectrum of IT services designed to optimise your
            operations, secure your data and accelerate your growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, description, color, href }) => (
            <Link
              key={title}
              href={href}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${color}`}
              >
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {description}
              </p>
              <span className="inline-flex items-center gap-1 text-blue-700 text-sm font-medium group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
          >
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
