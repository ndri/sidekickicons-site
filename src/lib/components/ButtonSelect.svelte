<script lang="ts" generics="T extends string">
  let {
    label,
    selectedValue,
    setSelectedValue,
    values,
    labels,
  }: {
    label: string;
    selectedValue: T;
    setSelectedValue: (value: T) => void;
    values: T[];
    labels?: Record<T, string>;
  } = $props();

  const name = $props.id();
</script>

<div class="flex flex-row flex-wrap gap-0.5" role="radiogroup" aria-label={label}>
  {#each values as value (value)}
    <label class="cursor-pointer">
      <input
        type="radio"
        class="peer sr-only"
        {name}
        {value}
        checked={value === selectedValue}
        onchange={() => setSelectedValue(value)}
      />
      <span
        class="rounded-lg px-2 py-1 text-sm font-medium text-slate-600 hover:text-slate-400 peer-checked:bg-indigo-50 peer-checked:text-indigo-800 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-600 dark:text-slate-400 dark:hover:text-slate-500 dark:peer-checked:bg-indigo-900 dark:peer-checked:text-slate-100"
      >
        {labels ? labels[value] : value}
      </span>
    </label>
  {/each}
</div>
