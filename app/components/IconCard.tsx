import {
  DocumentDuplicateIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
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
    <div className="group bg-slate-50 p-4 rounded-md grid grid-rows-1 grid-cols-1">
      <div className="flex flex-col items-center row-span-full col-span-full group-hover:opacity-25 justify-center">
        <Icon className={`${classes} text-slate-700`} />
        <p
          className="text-slate-500 text-xs mt-2 max-w-full truncate"
          title={name}
        >
          {name}
        </p>
      </div>
      <div className="invisible col-start-1 col-end-2 row-start-1 row-end-2 group-hover:visible flex flex-col gap-1 z-10">
        <button className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 flex justify-center gap-1">
          <DocumentDuplicateIcon className="w-5 h-5 text-gray-400" />
          Copy
        </button>
        <button className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 flex justify-center gap-1">
          <InformationCircleIcon className="w-5 h-5 text-gray-400" />
          Info
        </button>
      </div>
    </div>
  );
}
