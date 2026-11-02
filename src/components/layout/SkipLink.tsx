/**
 * SkipLink: first focusable element on every page. Visible only on focus.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="type-button fixed top-3 left-3 z-[100] -translate-y-24 rounded-pill bg-accent px-5 py-3 text-on-accent transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>
  );
}
