import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "story" | "poem" | "essay" | "review";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
          "border-transparent bg-destructive text-destructive-foreground": variant === "destructive",
          "text-foreground": variant === "outline",
          // Content Type colors
          "border-transparent bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300": variant === "story",
          "border-transparent bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300": variant === "poem",
          "border-transparent bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300": variant === "essay",
          "border-transparent bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300": variant === "review",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
