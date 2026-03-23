import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Operations Director",
    company: "FinServe UK Ltd",
    rating: 5,
    quote:
      "Terrabyte Ltd transformed our IT infrastructure. Their team is responsive, knowledgeable and truly understands the needs of a financial services firm.",
    initials: "SM",
  },
  {
    name: "James O'Brien",
    role: "Managing Director",
    company: "OBrien Retail Group",
    rating: 5,
    quote:
      "We moved our entire operation to the cloud with Terrabyte's help. Downtime has virtually disappeared and we're saving 35% on IT costs.",
    initials: "JO",
  },
  {
    name: "Priya Sharma",
    role: "IT Manager",
    company: "Nexus Healthcare",
    rating: 5,
    quote:
      "Their cybersecurity audit uncovered vulnerabilities we didn't know existed. They not only identified the issues but fixed them swiftly and professionally.",
    initials: "PS",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            Client Stories
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            What our clients say
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            We let our work speak for itself. Here&apos;s what some of our valued
            clients have to say about working with Terrabyte Ltd.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, company, rating, quote, initials }) => (
            <div
              key={name}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-orange-400 fill-orange-400"
                  />
                ))}
              </div>

              <blockquote className="text-gray-700 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-white text-sm font-bold">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{name}</p>
                  <p className="text-gray-500 text-xs">
                    {role}, {company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
