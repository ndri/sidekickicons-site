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
  return (
    <div>
      <label className="sr-only">{label}</label>
      <select
        className="block cursor-pointer rounded-md border-0 bg-indigo-50 py-0.5 pl-2 pr-8 text-sm font-medium text-indigo-800 ring-inset focus:ring-2 focus:ring-indigo-600"
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