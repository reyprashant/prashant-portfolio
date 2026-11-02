"use client";

/**
 * CopyButton: copies text to the clipboard and confirms in an aria-live region.
 */
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <span className="inline-flex items-center gap-4">
      <Button variant="outline" size="sm" onClick={copy}>
        {label}
      </Button>
      <span aria-live="polite" className="type-small text-fg-muted">
        {status === "copied" && "Copied"}
        {status === "failed" && "Copy failed. Select the text instead."}
      </span>
    </span>
  );
}
