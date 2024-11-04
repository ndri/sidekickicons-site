export default function DescriptionList({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="w-full divide-y divide-slate-100">
      {rows.map(([dt, dd]) => (
        <div key={dt} className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-slate-900">{dt}</dt>
          <dd className="mt-1 text-sm/6 text-slate-700 sm:col-span-2 sm:mt-0">{dd}</dd>
        </div>
      ))}
    </dl>
  );
}
