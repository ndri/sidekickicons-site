export default function DropdownSelect<T extends string>({
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
}) {
  const id = label.toLowerCase().replace(/ /g, "_");
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        className="block cursor-pointer rounded-md border-0 bg-indigo-50 py-0.5 pl-2 pr-8 text-sm font-medium text-indigo-800 ring-inset focus:ring-2 focus:ring-indigo-600 dark:bg-indigo-900 dark:text-slate-100"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value as T)}
      >
        <optgroup label={label}>
          {values.map((value) => (
            <option key={value} value={value}>
              {labels ? labels[value] : value}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}
