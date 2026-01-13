export default function DescriptionList({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <dl className="w-full divide-y divide-slate-100 dark:divide-slate-700">
      {rows.map(([dt, dd]) => (
        <div key={dt} className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium">{dt}</dt>
          <dd className="mt-1 text-sm/6 text-slate-600 sm:col-span-2 sm:mt-0 dark:text-slate-300">
            {dd}
          </dd>
        </div>
      ))}
    </dl>
  );
}
