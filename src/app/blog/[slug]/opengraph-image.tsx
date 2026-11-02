/** Open Graph image for a blog post: the title in the display face. */
import { getPost, postStaticParams } from "@/lib/blog";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Blog post by Prashant Adhikari";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return postStaticParams();
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return renderOgImage({
    lines: [post?.title ?? "Blog"],
    eyebrow: "Blog",
    textSize: "title",
  });
}
