<script lang="ts">
  import { ArrowLeftIcon } from "@sidekickicons/svelte/16/solid";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import PageMeta from "$lib/components/PageMeta.svelte";
  import Link from "$lib/components/Link.svelte";
  import Button from "$lib/components/Button.svelte";
  import CodeBlock from "$lib/components/CodeBlock.svelte";
  import DocsTable from "$lib/components/DocsTable.svelte";
  import IconTiles from "$lib/components/IconTiles.svelte";
  import { iconPagePath } from "$lib/util/iconPages";

  let { data } = $props();

  // The closing script tag is split so it doesn't end this component's script block
  const usageCode = `<script>
  import { ChartBarIcon, CrownIcon } from "@sidekickicons/svelte/24/outline";
</${"script"}>

<ChartBarIcon class="text-slate-500" />
<CrownIcon class="size-8 text-indigo-600" />`;

  const deepImportCode = `import CrownIcon from "@sidekickicons/svelte/24/outline/CrownIcon.svelte";`;

  const accessibilityCode = `<button aria-label="Upgrade">
  <CrownIcon class="text-indigo-600" />
</button>`;

  const styles = [
    ["Outline", "24/outline", "24×24, 1.5 px stroke", "24 px"],
    ["Solid", "24/solid", "24×24, solid fill", "24 px"],
    ["Mini", "20/solid", "20×20, solid fill", "20 px"],
    ["Micro", "16/solid", "16×16, solid fill", "16 px"],
  ];
</script>

<PageMeta
  title="Heroicons for Svelte · Sidekickicons"
  description="Heroicons has no official Svelte package. @sidekickicons/svelte has all {data.heroiconCount} Heroicons plus {data.sidekickiconCount} Sidekickicons as Svelte 5 components, with a class prop and tree-shaken imports."
  path="/svelte"
/>

<div class="flex flex-col items-center">
  <Header compact />
  <main class="flex w-full max-w-7xl flex-col gap-12 p-4 sm:p-8">
    <div class="flex max-w-3xl flex-col gap-4">
      <p class="text-sm">
        <Link href="/"><ArrowLeftIcon class="mr-0.5" />Search icons</Link>
      </p>
      <h1 class="text-2xl font-bold sm:text-3xl">Heroicons for Svelte</h1>
      <p>
        Heroicons has no official Svelte package. <code class="font-mono text-sm"
          >@sidekickicons/svelte</code
        >
        has all {data.heroiconCount} Heroicons plus {data.sidekickiconCount} Sidekickicons
        as Svelte 5 components. It needs Svelte 5.19 or later.
      </p>
      <div>
        <Button text="Browse icons with Svelte code" size="lg" href="/?code=Svelte" />
      </div>
    </div>

    <section class="flex max-w-3xl flex-col gap-4">
      <h2 class="text-lg font-semibold">Install</h2>
      <CodeBlock code="npm install @sidekickicons/svelte" language="bash" />
    </section>

    <section class="flex max-w-3xl flex-col gap-4">
      <h2 class="text-lg font-semibold">Usage</h2>
      <p>
        Import icons from the directory of the style you want. Heroicons and
        Sidekickicons come from the same package, so you can mix them freely. Only the
        icons you import end up in your bundle.
      </p>
      <CodeBlock code={usageCode} language="svg" />
      <DocsTable
        head={["Style", "Import from", "Design", "Default size"]}
        rows={styles}
        monoColumns={[1]}
      />
      <p>
        Component names are the icon name in PascalCase followed by <code
          class="font-mono text-sm">Icon</code
        >: <Link href={iconPagePath("crown")}>crown</Link> is
        <code class="font-mono text-sm">CrownIcon</code>.
      </p>
    </section>

    <section class="flex max-w-3xl flex-col gap-4">
      <h2 class="text-lg font-semibold">Size and color</h2>
      <ul class="flex list-disc flex-col gap-1 pl-5 text-slate-600 dark:text-slate-300">
        <li>
          Icons have a default size of 24, 20 or 16 px, depending on the style. Any size
          class you pass, like <code class="font-mono text-sm">size-8</code> in Tailwind,
          overrides it.
        </li>
        <li>
          Icons use <code class="font-mono text-sm">currentColor</code>, so they take
          the text color around them, or a color class like
          <code class="font-mono text-sm">text-indigo-600</code>.
        </li>
        <li>
          The <code class="font-mono text-sm">class</code> prop works like any Svelte class
          attribute, so it also takes arrays and objects.
        </li>
      </ul>
    </section>

    <section class="flex max-w-3xl flex-col gap-4">
      <h2 class="text-lg font-semibold">Importing a single icon</h2>
      <p>You can also import a single icon file directly, with full types:</p>
      <CodeBlock code={deepImportCode} language="jsx" />
    </section>

    <section class="flex max-w-3xl flex-col gap-4">
      <h2 class="text-lg font-semibold">Accessibility</h2>
      <p>
        Icons are hidden from screen readers, so give the button or link around an icon
        a label:
      </p>
      <CodeBlock code={accessibilityCode} language="svg" />
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Icons Heroicons doesn't have</h2>
      <p class="max-w-3xl">
        The package also has {data.sidekickiconCount} Sidekickicons in the same style, like
        these. See them all on <Link href="/missing-heroicons"
          >Icons missing from Heroicons</Link
        >.
      </p>
      <IconTiles icons={data.featured} />
    </section>
  </main>
  <Footer />
</div>
