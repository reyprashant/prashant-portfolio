/**
 * Blog post. Prerendered for every published slug; unknown slugs 404.
 * Metadata, canonical, Open Graph (type article) and Article JSON-LD come
 * from the post's meta export. Below the body: tags, a first-publication
 * credit when the piece appeared elsewhere, a short author bio and links to
 * other posts.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/blog/PostList";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { CtaBand } from "@/components/layout/CtaBand";
import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SmartImage } from "@/components/ui/SmartImage";
import { TextLink } from "@/components/ui/TextLink";
import { bios } from "@/data/about";
import { blogCta, postFooter } from "@/data/blog";
import { seoPages } from "@/data/seo";
import { site } from "@/data/site";
import { getAllPosts, getPost, getPostComponent, postStaticParams } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { absoluteUrl } from "@/lib/metadata";
import { articleSchema } from "@/lib/schema";

type Params = { slug: string };

/**
 * The whole route is static. A slug that was not prerendered is rendered in
 * full before being served, so an unknown slug gets a real 404 status rather
 * than a streamed shell with a 200.
 */
export const ensureStatic = "navigation";

export function generateStaticParams(): Params[] {
  return postStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found", robots: { index: false } };

  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.name],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const Body = await getPostComponent(post.slug);
  const updated = post.updated && post.updated !== post.date ? post.updated : null;
  const others = (await getAllPosts()).filter((p) => p.slug !== post.slug).slice(0, 2);
  const origin = post.originallyPublished;
  const shortBio = bios.items[0]?.text;

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <Section surface="black" ariaLabel="Post introduction">
        <Container className="flex flex-col gap-10">
          <Breadcrumbs
            items={[
              { label: seoPages.blog.label, href: seoPages.blog.path },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <div className="max-w-4xl">
            <Eyebrow className="mb-6">{post.category ?? "Blog"}</Eyebrow>
            <h1 className="type-display-2 text-fg">{post.title}</h1>
            <p className="type-body-lg mt-7 max-w-2xl text-on-dark">{post.description}</p>
            <p className="type-small mt-6 text-on-dark-muted">
              <span>{site.name}</span>
              <span aria-hidden="true"> &middot; </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true"> &middot; </span>
              <span>{post.readingMinutes} min read</span>
              {updated && (
                <>
                  <span aria-hidden="true"> &middot; </span>
                  <span>
                    Updated <time dateTime={updated}>{formatDate(updated)}</time>
                  </span>
                </>
              )}
            </p>
            {origin && (
              <p className="type-small mt-2 text-on-dark-muted">
                First published in{" "}
                {origin.url ? (
                  <a
                    href={origin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    {origin.publication}
                  </a>
                ) : (
                  origin.publication
                )}
                {origin.organisation ? ` by ${origin.organisation}` : ""}.
              </p>
            )}
          </div>
          {post.cover && (
            <SmartImage
              asset={post.cover}
              sizes="(min-width: 1440px) 1320px, 100vw"
              className="mt-2 aspect-[16/9]"
              fill
              preload
              quality={75}
            />
          )}
        </Container>
      </Section>

      <Section surface="white">
        <Container>
          <article className="prose-site mx-auto max-w-[68ch]">
            <Body />
            {origin?.note && (
              <p className="type-small border-t border-line pt-6 text-fg-muted">{origin.note}</p>
            )}
          </article>

          {post.tags && post.tags.length > 0 && (
            <ul className="mx-auto mt-12 flex max-w-[68ch] flex-wrap gap-2" aria-label="Tags">
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

          <aside
            aria-label="About the author"
            className="mx-auto mt-12 flex max-w-[68ch] flex-col gap-4 border-t border-line pt-8"
          >
            <p className="type-eyebrow text-fg-eyebrow">About the author</p>
            {shortBio && <p className="type-body text-fg-muted">{shortBio}</p>}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <TextLink href={postFooter.aboutLink.href}>{postFooter.aboutLink.label}</TextLink>
              <TextLink href={postFooter.backLink.href}>{postFooter.backLink.label}</TextLink>
            </div>
          </aside>
        </Container>
      </Section>

      {others.length > 0 && (
        <Section surface="grey" ariaLabel="More posts">
          <Container>
            <h2 className="type-h3 mb-8 text-fg">{postFooter.moreHeading}</h2>
            <PostList posts={others} headingLevel="h3" />
          </Container>
        </Section>
      )}
      <CtaBand {...blogCta} />
    </>
  );
}
