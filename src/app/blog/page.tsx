/**
 * Blog index. Lists published posts newest first; shows a short empty state
 * until the first post exists.
 */
import type { Metadata } from "next";
import { PostList } from "@/components/blog/PostList";
import { Container } from "@/components/layout/Container";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { blogCta, blogEmpty, blogHero } from "@/data/blog";
import { seoPages } from "@/data/seo";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("blog");

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHero
        breadcrumb={{ label: seoPages.blog.label, href: seoPages.blog.path }}
        eyebrow={blogHero.eyebrow}
        lines={blogHero.headingLines}
        accentLine={blogHero.accentLine}
        intro={blogHero.intro}
      />
      <Section surface="white" ariaLabel="Posts">
        <Container>
          {posts.length > 0 ? (
            <Reveal>
              <PostList posts={posts} />
            </Reveal>
          ) : (
            <Reveal className="flex max-w-prose flex-col items-start gap-6">
              <h2 className="type-h3 text-fg">{blogEmpty.heading}</h2>
              <p className="type-body text-fg-muted">{blogEmpty.body}</p>
              <Button href={blogEmpty.cta.href} variant="outline">
                {blogEmpty.cta.label}
              </Button>
            </Reveal>
          )}
        </Container>
      </Section>
      <CtaBand {...blogCta} />
    </>
  );
}
