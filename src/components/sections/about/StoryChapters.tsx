/**
 * StoryChapters: three first-person chapters with alternating photos.
 * Chapter 3 carries id="zenox" for the /about#zenox deep link.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { chapters } from "@/data/about";
import { cn } from "@/lib/cn";

export function StoryChapters() {
  return (
    <Section surface="white" id="story">
      <Container className="flex flex-col gap-20 lg:gap-28">
        {chapters.map((chapter, index) => {
          const flip = index % 2 === 1;
          return (
            <Reveal
              as="article"
              key={chapter.title}
              className="grid scroll-mt-(--header-h) grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-20"
            >
              {/* id lives on an inner element so the article keeps its own margin */}
              <div id={chapter.id} className={cn(flip && "md:order-2")}>
                <SmartImage
                  asset={chapter.image}
                  sizes="(min-width: 1100px) 620px, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className={cn("flex flex-col", flip && "md:order-1")}>
                <Eyebrow className="mb-4">{chapter.eyebrow}</Eyebrow>
                <h2 className="type-h3 text-fg md:text-[32px]">{chapter.title}</h2>
                <div className="mt-6 flex max-w-prose flex-col gap-5">
                  {chapter.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="type-body text-fg-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </Container>
    </Section>
  );
}
