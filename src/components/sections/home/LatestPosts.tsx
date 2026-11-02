/**
 * LatestPosts: the three newest published posts on the home page.
 * Renders nothing while no post is published, so the home page never
 * shows an empty block.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/layout/SectionHead";
import { PostList } from "@/components/blog/PostList";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { latestPosts } from "@/data/blog";
import { getAllPosts } from "@/lib/blog";

export async function LatestPosts() {
  const posts = (await getAllPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section surface="grey" id="blog">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow={latestPosts.eyebrow}
            lines={latestPosts.headingLines}
            aside={
              <div>
                <Button href={latestPosts.cta.href} variant="outline">
                  {latestPosts.cta.label}
                </Button>
              </div>
            }
          />
        </Reveal>
        <Reveal>
          <PostList posts={posts} headingLevel="h3" />
        </Reveal>
      </Container>
    </Section>
  );
}
