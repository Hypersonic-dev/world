import type { Metadata } from "next";
import Link from "next/link";
import {
  HeadphonesIcon,
  Cloud,
  Shield,
  Database,
  Network,
  Code2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services – Terrabyte Ltd",
  description:
    "Explore our full range of IT services including managed support, cloud solutions, cybersecurity, and more.",
};

const services = [
  {
    id: "it-support",
    icon: HeadphonesIcon,
    title: "Managed IT Support",
    description:
      "Our managed IT support service provides proactive monitoring, fast helpdesk response and on-site assistance. We become your virtual IT department, handling everything from day-to-day issues to long-term infrastructure planning.",
    features: [
      "24/7 remote monitoring and alerting",
      "Dedicated UK-based helpdesk",
      "On-site engineer visits",
      "Monthly IT health reports",
      "Software updates and patch management",
    ],
    color: "blue",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Migrate to the cloud with confidence. We are certified Microsoft Azure and AWS partners, providing seamless migration, management and cost optimisation for your cloud environment.",
    features: [
      "Cloud migration strategy and planning",
      "Microsoft Azure & AWS deployment",
      "Cloud cost optimisation",
      "Hybrid and multi-cloud solutions",
      "Ongoing cloud management",
    ],
    color: "sky",
  },
  {
    id: "cybersecurity",
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Protect your business from modern cyber threats. Our multi-layered security approach covers everything from endpoint protection to staff awareness training and regulatory compliance.",
    features: [
      "Vulnerability assessments & penetration testing",
      "Endpoint detection and response (EDR)",
      "Security Information & Event Management (SIEM)",
      "Phishing simulations and staff training",
      "GDPR & Cyber Essentials compliance",
    ],
    color: "orange",
  },
  {
    id: "data",
    icon: Database,
    title: "Data Management",
    description:
      "Your data is your most valuable asset. We ensure it is properly backed up, recoverable and governed in line with UK data protection regulations.",
    features: [
      "Cloud and on-site backup solutions",
      "Disaster recovery planning and testing",
      "GDPR compliance consulting",
      "Data lifecycle management",
      "Storage optimisation",
    ],
    color: "purple",
  },
  {
    id: "network",
    icon: Network,
    title: "Network Infrastructure",
    description:
      "A reliable, fast network is the backbone of your operations. We design, install and maintain networks that scale with your business.",
    features: [
      "LAN and WAN design and installation",
      "Wi-Fi surveys and enterprise wireless",
      "SD-WAN solutions",
      "Firewall and perimeter security",
      "Network monitoring and performance",
    ],
    color: "green",
  },
  {
    id: "software",
    icon: Code2,
    title: "Software Development",
    description:
      "Need a bespoke solution? Our development team builds web and mobile applications that automate processes and deliver competitive advantage.",
    features: [
      "Custom web application development",
      "Mobile app development (iOS & Android)",
      "API integration and automation",
      "Legacy system modernisation",
      "Ongoing maintenance and support",
    ],
    color: "pink",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  sky: "bg-sky-100 text-sky-700",
  orange: "bg-orange-100 text-orange-700",
  purple: "bg-purple-100 text-purple-700",
  green: "bg-green-100 text-green-700",
  pink: "bg-pink-100 text-pink-700",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 pt-32 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-orange-300 font-semibold text-sm uppercase tracking-widest">
            What We Offer
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Our Services</h1>
          <p className="mt-4 text-blue-200 max-w-2xl mx-auto">
            From proactive IT support to cloud transformation and cybersecurity –
            we provide the technology backbone your business needs to thrive.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {services.map(({ id, icon: Icon, title, description, features, color }, idx) => (
            <div
              key={id}
              id={id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 ${colorMap[color]}`}
                >
                  <Icon size={26} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {description}
                </p>
                <ul className="space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-orange-500 shrink-0 mt-0.5"
                      />
                      <span className="text-gray-700 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-7 py-3 rounded-full text-sm transition-colors"
                >
                  Enquire Now <ArrowRight size={14} />
                </Link>
              </div>

              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <div
                  className={`rounded-3xl h-72 flex items-center justify-center ${colorMap[color]}`}
                >
                  <Icon size={80} className="opacity-30" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-gray-600 mb-8">
            Our experts will assess your current IT environment and recommend
            the most cost-effective solution for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
          >
            Book a Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
