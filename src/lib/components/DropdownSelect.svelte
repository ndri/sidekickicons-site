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

  const id = $derived(label.toLowerCase().replace(/ /g, "_"));
</script>

<div>
  <label for={id} class="sr-only">{label}</label>
  <select
    {id}
    class="block cursor-pointer rounded-md border-0 bg-indigo-50 py-0.5 pl-2 pr-8 text-sm font-medium text-indigo-800 ring-inset focus:ring-2 focus:ring-indigo-600 dark:bg-indigo-900 dark:text-slate-100"
    value={selectedValue}
    onchange={(e) => setSelectedValue(e.currentTarget.value as T)}
  >
    <optgroup {label}>
      {#each values as value (value)}
        <option {value}>{labels ? labels[value] : value}</option>
      {/each}
    </optgroup>
  </select>
</div>
