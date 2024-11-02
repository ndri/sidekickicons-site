import { Heroicon, HeroiconType } from "../types";

export default function IconCard({
  name,
  Icon,
  type,
}: {
  name: string;
  Icon: Heroicon;
  type: HeroiconType;
}) {
  const classes = {
    outline24: "w-6 h-6",
    solid24: "w-6 h-6",
    solid20: "w-5 h-5",
    solid16: "w-4 h-4",
  }[type];
  return (
    <div className="bg-slate-50 p-4 rounded-md flex flex-col items-center">
      <Icon className={`${classes} text-slate-700`} />
      <p className="text-slate-500 text-xs mt-2 max-w-full truncate" title={name}>
        {name}
      </p>
    </div>
  );
}
