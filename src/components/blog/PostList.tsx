/**
 * PostList: rows of posts with date, reading time, title, description and
 * tags. Shared by the blog index and the home page's latest-posts block.
 */
import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatDate } from "@/lib/format";
import type { Post } from "@/types/content";

type PostListProps = {
  posts: Post[];
  /** Heading level for each title: h2 on the index, h3 under a section heading. */
  headingLevel?: "h2" | "h3";
};

export function PostList({ posts, headingLevel: HeadingTag = "h2" }: PostListProps) {
  return (
    <ul className="border-b border-line">
      {posts.map((post) => (
        <li key={post.slug}>
          <article className="grid grid-cols-1 gap-5 border-t border-line py-8 md:grid-cols-[260px_1fr] md:gap-10">
            <div className="flex flex-col gap-4">
              {post.cover && (
                <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
                  <SmartImage
                    asset={post.cover}
                    sizes="(min-width: 768px) 260px, 100vw"
                    className="aspect-[16/9]"
                    fill
                    hideBadge
                    quality={60}
                  />
                </Link>
              )}
              <p className="type-small text-fg-muted">
                {post.category && (
                  <>
                    <span className="text-fg">{post.category}</span>
                    <span aria-hidden="true"> &middot; </span>
                  </>
                )}
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true"> &middot; </span>
                <span>{post.readingMinutes} min read</span>
              </p>
            </div>
            <div>
              <HeadingTag className="type-h3 text-fg">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors duration-(--duration-fast) hover:text-highlight"
                >
                  {post.title}
                </Link>
              </HeadingTag>
              <p className="type-body mt-3 max-w-prose text-fg-muted">{post.description}</p>
              {post.tags && post.tags.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="type-eyebrow border border-line px-3 py-1.5 text-fg-eyebrow"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
