"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const headingSelector = ".hero-title, .page-title, .section-title";

function hasVisibleContent(nodes: Node[]) {
  return nodes.some((node) => (node.textContent ?? "").trim().length > 0);
}

function splitHeading(heading: HTMLElement) {
  if (heading.dataset.lines === "ready") return;

  const groups: Node[][] = [[]];
  for (const node of Array.from(heading.childNodes)) {
    if (node instanceof HTMLBRElement) {
      groups.push([]);
      continue;
    }
    groups[groups.length - 1].push(node);
  }

  const lines = groups.filter(hasVisibleContent);
  if (lines.length === 0) return;

  heading.replaceChildren();
  lines.forEach((group, index) => {
    const mask = document.createElement("span");
    mask.className = "line-mask";
    mask.style.setProperty("--line", String(index));
    const inner = document.createElement("span");
    inner.className = "line-mask-inner";
    group.forEach((node) => inner.appendChild(node));
    mask.appendChild(inner);
    heading.appendChild(mask);
  });
  heading.dataset.lines = "ready";
}

function reveal(heading: HTMLElement) {
  heading.classList.add("text-in");
  if (!heading.classList.contains("section-title")) return;
  const previous = heading.previousElementSibling;
  if (previous instanceof HTMLElement && previous.classList.contains("eyebrow")) {
    previous.classList.add("text-focus");
  }
}

/** Line mask on large titles; focus on the eyebrow that sits above a section title. */
export function TextMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.getElementById("contenuto");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const headings = Array.from(root.querySelectorAll<HTMLElement>(headingSelector));
    const below: HTMLElement[] = [];
    const frames: number[] = [];

    for (const heading of headings) {
      splitHeading(heading);
      const top = heading.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.9) {
        frames.push(
          requestAnimationFrame(() => {
            frames.push(requestAnimationFrame(() => reveal(heading)));
          }),
        );
      } else {
        below.push(heading);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.35 },
    );

    below.forEach((heading) => observer.observe(heading));

    return () => {
      frames.forEach((frame) => cancelAnimationFrame(frame));
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
