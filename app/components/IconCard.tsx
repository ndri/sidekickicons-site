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
    <div className="group grid grid-cols-1 grid-rows-1 rounded-md bg-slate-50 p-4">
      <div className="col-span-full row-span-full flex flex-col items-center justify-center group-hover:opacity-25">
        <Icon className={`${classes} text-slate-700`} />
        <p className="mt-2 max-w-full truncate text-xs text-slate-500" title={name}>
          {name}
        </p>
      </div>
      <div className="invisible z-10 col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col gap-1 group-hover:visible">
        <button className="flex justify-center gap-1 rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <DocumentDuplicateIcon className="h-5 w-5 text-gray-400" />
          Copy
        </button>
        <button className="flex justify-center gap-1 rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <InformationCircleIcon className="h-5 w-5 text-gray-400" />
          Info
        </button>
      </div>
    </div>
  );
}
