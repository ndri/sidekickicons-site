import { Field, Label, Radio, RadioGroup } from "@headlessui/react";

export default function ButtonSelect<T extends string>({
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
    <RadioGroup
      value={selectedValue}
      onChange={setSelectedValue}
      className="flex flex-row gap-0.5"
      aria-label={label}
    >
      {values.map((value) => (
        <Field key={value} className="cursor-pointer">
          <Radio
            value={value}
            className="dark:data-[checked]:text rounded-lg px-2 py-1 text-sm font-medium text-slate-600 hover:text-slate-400 focus:outline-none data-[checked]:bg-indigo-50 data-[checked]:text-indigo-800 data-[focus]:outline-0 data-[focus]:ring-2 data-[focus]:ring-indigo-600 dark:text-slate-400 dark:hover:text-slate-500 dark:data-[checked]:bg-indigo-900 dark:data-[checked]:text-slate-100"
          >
            <Label className="cursor-pointer">{labels ? labels[value] : value}</Label>
          </Radio>
        </Field>
      ))}
    </RadioGroup>
  );
}
