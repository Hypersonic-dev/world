import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Users, Award, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us – Terrabyte Ltd",
  description:
    "Learn about Terrabyte Ltd – our history, mission and the team of experts behind our IT solutions.",
};

const team = [
  {
    name: "David Clarke",
    role: "Chief Executive Officer",
    bio: "20 years in IT services. Former CTO at a FTSE 250 firm.",
    initials: "DC",
  },
  {
    name: "Rachel Thompson",
    role: "Head of Cybersecurity",
    bio: "CISSP certified. Led security programmes for banks and healthcare providers.",
    initials: "RT",
  },
  {
    name: "Mohammed Al-Rashid",
    role: "Cloud Architect",
    bio: "Microsoft MVP. Specialises in large-scale Azure migrations.",
    initials: "MA",
  },
  {
    name: "Lucy Hargreaves",
    role: "Client Success Manager",
    bio: "Ensures every client gets the most value from our services.",
    initials: "LH",
  },
  {
    name: "Tom Bradley",
    role: "Lead Network Engineer",
    bio: "CCNP certified with 12 years of enterprise networking experience.",
    initials: "TB",
  },
  {
    name: "Aisha Okafor",
    role: "Software Development Lead",
    bio: "Full-stack developer and architect of bespoke enterprise platforms.",
    initials: "AO",
  },
];

const values = [
  {
    icon: Users,
    title: "People First",
    description:
      "We build genuine relationships with our clients and treat their business as if it were our own.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in every project, from planning through to delivery.",
  },
  {
    icon: Globe,
    title: "Innovation",
    description:
      "We continuously invest in training and emerging technologies to stay ahead of the curve.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 pt-32 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-orange-300 font-semibold text-sm uppercase tracking-widest">
            Our Story
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">About Terrabyte Ltd</h1>
          <p className="mt-4 text-blue-200 max-w-2xl mx-auto">
            Founded in 2009, we have grown from a small London helpdesk into a
            national IT solutions provider trusted by hundreds of UK businesses.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
                Our Mission
              </span>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 mb-4">
                Technology that empowers people
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Terrabyte, we believe technology should work for you – not
                against you. Our mission is to simplify IT so that businesses of
                all sizes can compete in the digital economy without the
                headache.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We combine deep technical expertise with a genuine understanding
                of business challenges to deliver solutions that drive real
                results.
              </p>
              <ul className="space-y-3">
                {[
                  "Registered in England & Wales (Company No. 12345678)",
                  "Headquartered in London with engineers nationwide",
                  "Member of techUK",
                  "Cyber Essentials Plus certified",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-8">Company Timeline</h3>
              <div className="space-y-6">
                {[
                  {
                    year: "2009",
                    event: "Founded in Shoreditch, London with 3 engineers.",
                  },
                  {
                    year: "2013",
                    event: "Expanded to Manchester and Birmingham offices.",
                  },
                  {
                    year: "2016",
                    event: "Achieved ISO 27001 certification.",
                  },
                  {
                    year: "2019",
                    event: "Became a Microsoft Gold Partner.",
                  },
                  {
                    year: "2022",
                    event: "Launched dedicated Cybersecurity practice.",
                  },
                  {
                    year: "2024",
                    event: "Surpassed 500 active clients across the UK.",
                  },
                ].map(({ year, event }) => (
                  <div key={year} className="flex gap-4">
                    <span className="text-orange-300 font-bold text-sm w-10 shrink-0">
                      {year}
                    </span>
                    <span className="text-blue-100 text-sm">{event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-700 mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white" id="team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Meet the Team
            </span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              The experts behind Terrabyte
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map(({ name, role, bio, initials }) => (
              <div
                key={name}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-14 h-14 rounded-full bg-blue-800 flex items-center justify-center text-white font-bold text-lg mb-4">
                  {initials}
                </div>
                <h3 className="font-bold text-gray-900">{name}</h3>
                <p className="text-orange-500 text-sm font-medium mb-2">{role}</p>
                <p className="text-gray-600 text-sm">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to work with us?
          </h2>
          <p className="text-blue-200 mb-8">
            Get in touch and let&apos;s discuss how we can help your business
            achieve more with technology.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
