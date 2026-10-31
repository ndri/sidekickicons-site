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

  const usageCode = `import { ChartBarIcon, CrownIcon } from "@sidekickicons/react-native/24/outline";
import { View } from "react-native";

export function Example() {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <ChartBarIcon color="#64748b" />
      <CrownIcon size={32} color="#4f46e5" />
    </View>
  );
}`;

  const accessibilityCode = `<Pressable accessibilityRole="button" accessibilityLabel="Upgrade">
  <CrownIcon color="#4f46e5" />
</Pressable>`;

  const typesCode = `import type { IconComponent } from "@sidekickicons/react-native";

type TabProps = {
  icon: IconComponent;
  label: string;
};`;

  const migrationCode = `// Before
import { SparklesIcon } from "react-native-heroicons/outline";

// After
import { SparklesIcon } from "@sidekickicons/react-native/24/outline";`;

  const styles = [
    ["Outline", "24/outline", "24×24, 1.5 px stroke", "24"],
    ["Solid", "24/solid", "24×24, solid fill", "24"],
    ["Mini", "20/solid", "20×20, solid fill", "20"],
    ["Micro", "16/solid", "16×16, solid fill", "16"],
  ];

  const migration = [
    ["react-native-heroicons/outline", "@sidekickicons/react-native/24/outline"],
    ["react-native-heroicons/solid", "@sidekickicons/react-native/24/solid"],
    ["react-native-heroicons/mini", "@sidekickicons/react-native/20/solid"],
    ["react-native-heroicons/micro", "@sidekickicons/react-native/16/solid"],
  ];
</script>

<PageMeta
  title="Heroicons for React Native · Sidekickicons"
  description="Heroicons has no official React Native package. @sidekickicons/react-native has all {data.heroiconCount} Heroicons plus {data.sidekickiconCount} Sidekickicons as React Native components for iOS, Android and the web, with size and color props."
  path="/react-native"
/>

<div class="flex flex-col items-center">
  <Header compact />
  <main class="flex w-full max-w-7xl flex-col gap-12 p-4 sm:p-8">
    <div class="flex max-w-3xl flex-col gap-4">
      <p class="text-sm">
        <Link href="/"><ArrowLeftIcon class="mr-0.5" />Search icons</Link>
      </p>
      <h1 class="text-2xl font-bold sm:text-3xl">Heroicons for React Native</h1>
      <p>
        Heroicons has no official React Native package. <code class="font-mono text-sm"
          >@sidekickicons/react-native</code
        >
        has all {data.heroiconCount} Heroicons plus {data.sidekickiconCount} Sidekickicons
        as React Native components. They're drawn with react-native-svg, so they work on
        iOS, Android and the web with react-native-web.
      </p>
      <div>
        <Button
          text="Browse icons with React Native code"
          size="lg"
          href="/?code=React+Native"
        />
      </div>
    </div>

    <section class="flex max-w-3xl flex-col gap-4">
      <h2 class="text-lg font-semibold">Install</h2>
      <CodeBlock
        code="npm install @sidekickicons/react-native react-native-svg"
        language="bash"
      />
      <p class="text-sm text-slate-600 dark:text-slate-300">
        In an Expo app, install react-native-svg with
        <code class="font-mono">npx expo install react-native-svg</code> instead, so its
        version matches your SDK.
      </p>
    </section>

    <section class="flex max-w-3xl flex-col gap-4">
      <h2 class="text-lg font-semibold">Usage</h2>
      <p>
        Import icons from the directory of the style you want. Heroicons and
        Sidekickicons come from the same package, so you can mix them freely.
      </p>
      <CodeBlock code={usageCode} language="jsx" />
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
      <h2 class="text-lg font-semibold">Props</h2>
      <ul class="flex list-disc flex-col gap-1 pl-5 text-slate-600 dark:text-slate-300">
        <li>
          <code class="font-mono text-sm">size</code>: the width and height. Defaults to
          the style's size: 24, 20 or 16.
        </li>
        <li>
          <code class="font-mono text-sm">color</code>: the icon's color. On the web,
          icons also take the surrounding text color when no color is set.
        </li>
        <li>
          Any other react-native-svg <code class="font-mono text-sm">Svg</code> prop,
          such as
          <code class="font-mono text-sm">style</code>.
        </li>
      </ul>
    </section>

    <section class="flex max-w-3xl flex-col gap-4">
      <h2 class="text-lg font-semibold">Accessibility</h2>
      <p>
        Icons are hidden from screen readers, so give the button or link around an icon
        a label:
      </p>
      <CodeBlock code={accessibilityCode} language="jsx" />
    </section>

    <section class="flex max-w-3xl flex-col gap-4">
      <h2 class="text-lg font-semibold">TypeScript</h2>
      <p>
        The package comes with types. <code class="font-mono text-sm"
          >IconComponent</code
        >
        and
        <code class="font-mono text-sm">IconProps</code> can be imported from the package
        root, for example to pass icons as props:
      </p>
      <CodeBlock code={typesCode} language="jsx" />
    </section>

    <section class="flex max-w-3xl flex-col gap-4">
      <h2 class="text-lg font-semibold">Switching from react-native-heroicons</h2>
      <p>
        <code class="font-mono text-sm">react-native-heroicons</code> hasn't been
        updated since January 2024. Its <code class="font-mono text-sm">size</code> and
        <code class="font-mono text-sm">color</code> props work the same way here, so usually
        only the imports change:
      </p>
      <DocsTable
        head={["react-native-heroicons", "@sidekickicons/react-native"]}
        rows={migration}
        monoColumns={[0, 1]}
      />
      <CodeBlock code={migrationCode} language="jsx" />
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
