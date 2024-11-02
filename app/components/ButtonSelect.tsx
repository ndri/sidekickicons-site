import { Field, Label, Radio, RadioGroup } from "@headlessui/react";

export default function ButtonSelect<T extends string>({
  selectedValue,
  setSelectedValue,
  values,
  labels,
}: {
  selectedValue: T;
  setSelectedValue: (value: T) => void;
  values: T[];
  labels: Record<T, string>;
}) {
  return (
    <RadioGroup
      value={selectedValue}
      onChange={setSelectedValue}
      className="flex flex-row gap-0.5"
      aria-label="Icon type"
    >
      {values.map((value) => (
        <Field key={value} className="cursor-pointer">
          <Radio
            value={value}
            className="py-1 px-2 font-medium text-xs rounded-lg text-slate-600 data-[checked]:bg-indigo-50 data-[checked]:text-indigo-800"
          >
            <Label className="cursor-pointer">{labels[value]}</Label>
          </Radio>
        </Field>
      ))}
    </RadioGroup>
  );
}
