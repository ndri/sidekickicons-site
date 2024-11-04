"use client";

import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { FullHeroicon, HeroiconType, IconCodeType, IconSize } from "../types";
import { useState } from "react";
import IconDetailsDialog from "./IconDetailsDialog";
import { allIconSizeClasses, iconCodeFunctions } from "../util/constants";
import CopyButton from "./CopyButton";

export default function IconCard({
  type,
  fullHeroicon,
  size,
  codeType,
}: {
  type: HeroiconType;
  fullHeroicon: FullHeroicon;
  size: IconSize;
  codeType: IconCodeType;
}) {
  const [showDialog, setShowDialog] = useState(false);

  const iconClasses = allIconSizeClasses[size][type];
  const Icon = fullHeroicon[type];
  const name = fullHeroicon.kebabName;

  const codeToCopy = iconCodeFunctions[codeType](fullHeroicon, type);

  return (
    <div
      className="group grid grid-cols-1 grid-rows-1 rounded-md bg-slate-50 p-4"
      tabIndex={0}
    >
      <div className="col-span-full row-span-full flex flex-col items-center justify-center group-hover:opacity-25">
        <Icon className={`${iconClasses} text-slate-700`} />
        <p className="mt-2 max-w-full truncate text-xs text-slate-500" title={name}>
          {name}
        </p>
      </div>
      <div className="invisible z-10 col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col justify-center gap-1 group-focus-within:visible group-hover:visible">
        <CopyButton textToCopy={codeToCopy} />
        <button
          className="group/button flex justify-center gap-1 rounded bg-white px-2 py-1 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
          onClick={() => setShowDialog(true)}
        >
          <InformationCircleIcon className="h-5 w-5 text-slate-400 group-hover/button:text-slate-600" />
          Info
        </button>
      </div>
      <IconDetailsDialog
        open={showDialog}
        setOpen={setShowDialog}
        fullHeroicon={fullHeroicon}
        type={type}
        defaultCodeType={codeType}
      />
    </div>
  );
}
