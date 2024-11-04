"use client";

import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { FullHeroicon, HeroiconType, IconCodeType, IconSize } from "../types";
import { useState } from "react";
import IconDetailsDialog from "./IconDetailsDialog";
import { allIconSizeClasses, iconCodeFunctions } from "../util/constants";
import CopyButton from "./CopyButton";
import Button from "./Button";

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
      className="group/iconcard grid grid-cols-1 grid-rows-1 rounded-lg bg-slate-50 p-4 focus-within:ring-2 focus-within:ring-indigo-600 focus:outline-none dark:bg-slate-800"
      tabIndex={0}
    >
      <div className="col-span-full row-span-full flex flex-col items-center justify-center group-focus-within/iconcard:opacity-25 group-hover/iconcard:opacity-25">
        <Icon className={`${iconClasses} text-slate-700 dark:text-slate-100`} />
        <p
          className="mt-2 max-w-full truncate text-xs text-slate-500 dark:text-slate-400"
          title={name}
        >
          {name}
        </p>
      </div>
      <div className="invisible z-10 col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col justify-center gap-1 group-focus-within/iconcard:visible group-hover/iconcard:visible">
        <CopyButton textToCopy={codeToCopy} />
        <Button
          text="Info"
          Icon={InformationCircleIcon}
          style="light"
          onClick={() => setShowDialog(true)}
        />
      </div>
      {showDialog && (
        <IconDetailsDialog
          open={showDialog}
          setOpen={setShowDialog}
          fullHeroicon={fullHeroicon}
          defaultType={type}
          defaultCodeType={codeType}
        />
      )}
    </div>
  );
}
