/**
 * Blog post loader.
 *
 * Posts are MDX files in src/content/blog. The file name is the URL slug and
 * each file exports a `meta` object (see types/content.ts PostMeta). This
 * module runs on the server at build time only: every blog route is
 * prerendered, so reading the directory synchronously is fine.
 *
 * Add a post: copy an existing file, change the slug, fill in `meta`, write.
 * Drafts (`draft: true`) show in `next dev` and are left out of production
 * builds unless SHOW_DRAFT_POSTS=true.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";
import { shouldShowDraftPosts } from "@/lib/env";
import type { Post, PostMeta } from "@/types/content";

const POSTS_DIR = join(process.cwd(), "src/content/blog");
const WORDS_PER_MINUTE = 220;

type PostModule = {
  default: ComponentType<MDXProps>;
  meta?: PostMeta;
};

/** Every slug on disk, including drafts. */
export function listSlugs(): string[] {
  return readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

async function importPost(slug: string): Promise<PostModule> {
  // The template literal keeps the directory static so the bundler can
  // include every post; the slug picks one at runtime.
  return (await import(`@/content/blog/${slug}.mdx`)) as PostModule;
}

function assertMeta(slug: string, meta: PostMeta | undefined): PostMeta {
  if (!meta || !meta.title || !meta.description || !meta.date) {
    throw new Error(
      `Blog post "${slug}" must export meta with title, description and date.`,
    );
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) {
    throw new Error(`Blog post "${slug}" has a date that is not YYYY-MM-DD.`);
  }
  return meta;
}

/** Word count of the prose, ignoring the meta export and JSX tags. */
function readingMinutes(slug: string): number {
  const source = readFileSync(join(POSTS_DIR, `${slug}.mdx`), "utf8")
    .replace(/^export const meta[\s\S]*?^};?\s*$/m, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`[\]()-]/g, " ");
  const words = source.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Published posts, newest first. Memoised per render. */
export const getAllPosts = cache(async (): Promise<Post[]> => {
  const includeDrafts = shouldShowDraftPosts();
  const posts: Post[] = [];
  for (const slug of listSlugs()) {
    const mod = await importPost(slug);
    const meta = assertMeta(slug, mod.meta);
    if (meta.draft && !includeDrafts) continue;
    posts.push({ ...meta, slug, readingMinutes: readingMinutes(slug) });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
});

/**
 * Params for the /blog/[slug] routes. Cache Components requires at least one
 * entry, so every file on disk is listed: drafts render as 404 because
 * getPost() only returns published posts. If the folder is ever empty a
 * sentinel slug keeps the build valid and also renders a 404.
 */
export function postStaticParams(): Array<{ slug: string }> {
  const slugs = listSlugs();
  return (slugs.length > 0 ? slugs : ["no-posts-yet"]).map((slug) => ({ slug }));
}

/** One published post by slug, or null. */
export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

/** The compiled MDX body for a post. */
export async function getPostComponent(slug: string): Promise<ComponentType<MDXProps>> {
  const mod = await importPost(slug);
  return mod.default;
}
