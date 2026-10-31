<script lang="ts">
  let {
    head,
    rows,
    monoColumns = [],
  }: { head: string[]; rows: string[][]; monoColumns?: number[] } = $props();
</script>

<div class="overflow-x-auto rounded-md ring-1 ring-slate-200 dark:ring-slate-700">
  <table class="w-full text-left text-sm">
    <thead class="bg-slate-50 dark:bg-slate-800">
      <tr>
        {#each head as cell (cell)}
          <th class="px-3 py-2 font-semibold">{cell}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
      {#each rows as row (row[0])}
        <tr>
          {#each row as cell, i (i)}
            <td
              class={[
                "px-3 py-2 text-slate-600 dark:text-slate-300",
                monoColumns.includes(i) && "font-mono whitespace-nowrap text-xs",
              ]}
            >
              {cell}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
