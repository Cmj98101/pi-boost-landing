import Link from "next/link";
import { otherComparisons } from "@/lib/comparisons";

// Cross-links each comparison page to its siblings. Someone researching one
// alternative is usually weighing several, so this serves the reader as much
// as it spreads internal link equity across pages that previously had one
// inbound link apiece.
export default function RelatedComparisons({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const others = otherComparisons(currentSlug);
  if (others.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
          Comparing other editors?
        </h2>
        <p className="text-lg text-slate-600 text-center mb-12">
          See how Investigation Flow stacks up against the other tools
          investigators use.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="card-luxury p-6 flex flex-col transition-transform hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Investigation Flow vs. {c.competitor}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                {c.blurb}
              </p>
              <span className="mt-4 text-sm font-semibold text-purple-600">
                Read the comparison &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
