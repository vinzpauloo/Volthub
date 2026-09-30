import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

interface Resource {
  slug: string;
  title: string;
  description: string;
  type: string;
  image?: string;
  imageAlt?: string;
}

interface BlogResourcesSectionProps {
  title: string;
  description: string;
  resources: Resource[];
  /** Slugs to feature, in order. Falls back to the first three. */
  featuredSlugs?: string[];
}

export default function BlogResourcesSection({
  title,
  description,
  resources,
  featuredSlugs,
}: BlogResourcesSectionProps) {
  const featured = featuredSlugs
    ? featuredSlugs
        .map((slug) => resources.find((r) => r.slug === slug))
        .filter((r): r is Resource => Boolean(r))
    : resources.slice(0, 3);

  return (
    <section className="cr-section tight">
      <div className="cr-wrap">
        <div className="cr-section-head">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="cr-blog-grid">
          {featured.map((r) => (
            <Link key={r.slug} className="cr-blog-card" href={`/blog/${r.slug}` as Route}>
              <div className="cr-blog-img">
                {r.image && (
                  <Image
                    src={r.image}
                    alt={r.imageAlt || r.title}
                    fill
                    sizes="(min-width: 861px) 33vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="cr-blog-body">
                <div className="cr-blog-type">{r.type}</div>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
