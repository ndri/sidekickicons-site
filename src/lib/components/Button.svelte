<script lang="ts" module>
  export type ButtonStyle = "primary" | "light" | "black" | "amber";
  export type ButtonSize = "lg" | "md" | "sm";
</script>

<script lang="ts">
  import type { Component } from "svelte";
  import type { ClassValue } from "svelte/elements";

  let {
    text,
    Icon,
    style = "primary",
    size = "md",
    class: className = "",
    onclick = () => {},
    href,
  }: {
    text: string;
    Icon?: Component<{ class?: ClassValue }>;
    style?: ButtonStyle;
    size?: ButtonSize;
    class?: string;
    onclick?: () => void;
    href?: string;
  } = $props();

  const styleClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
    light:
      "bg-white text-slate-900 hover:bg-slate-100 focus-visible:outline-indigo-600 ring-1 ring-inset ring-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:ring-slate-700",
    black: "bg-black text-white hover:bg-slate-700 focus-visible:outline-black",
    amber: "bg-amber-700 text-white hover:bg-amber-600 focus-visible:outline-amber-700",
  };
  const sizeClasses = {
    lg: "px-3 py-2 gap-x-2 text-sm",
    md: "px-2 py-1.5 gap-x-1.5 text-sm",
    sm: "px-1.5 py-1 gap-x-1 text-sm",
  };
  const iconStyleClasses = {
    primary: "text-white",
    light:
      "text-slate-400 group-hover/button:text-slate-500 dark:text-slate-500 dark:group-hover/button:text-slate-400",
    black: "text-white",
    amber: "text-white",
  };
  const iconSizeClasses = {
    lg: "size-6",
    md: "size-5",
    sm: "size-4",
  };
  const sharedClass = $derived([
    "group/button inline-flex items-center justify-center rounded-md font-semibold shadow-sm focus-visible:outline focus-visible:outline-2",
    styleClasses[style],
    sizeClasses[size],
    className,
  ]);
</script>

{#snippet children()}
  {#if Icon}
    <Icon class={[iconSizeClasses[size], iconStyleClasses[style], "shrink-0"]} />
  {/if}
  {text}
{/snippet}

{#if href}
  <a {href} target="_blank" rel="noopener noreferrer" class={sharedClass}>
    {@render children()}
  </a>
{:else}
  <button type="button" class={sharedClass} {onclick}>
    {@render children()}
  </button>
{/if}
