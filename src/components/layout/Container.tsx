/**
 * Container: centres content at the site max width with responsive gutters.
 * Used by every section. Width and gutters come from globals.css (.container-site).
 */
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn("container-site", className)}>{children}</Tag>;
}
