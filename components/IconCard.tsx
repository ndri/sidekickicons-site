"use client";

import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { FullHeroicon, HeroiconType, IconCodeType, IconSize } from "../types";
import { allIconSizeClasses, iconCodeFunctions } from "../util/constants";
import CopyButton from "./CopyButton";
import Button from "./Button";

export default function IconCard({
  type,
  fullHeroicon,
  size,
  codeType,
  openDialog,
}: {
  type: HeroiconType;
  fullHeroicon: FullHeroicon;
  size: IconSize;
  codeType: IconCodeType;
  openDialog: () => void;
}) {
  const iconClasses = allIconSizeClasses[size][type];
  const Icon = fullHeroicon[type];
  const name = fullHeroicon.kebabName;

  const codeToCopy = iconCodeFunctions[codeType](fullHeroicon, type);

  return (
    <div className="group/iconcard grid grid-cols-1 grid-rows-1 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
      <div className="col-span-full row-span-full flex flex-col items-center justify-center group-hover/iconcard:opacity-25">
        <Icon className={`${iconClasses} text-slate-700 dark:text-slate-100`} />
        <p
          className="mt-2 max-w-full truncate text-xs text-slate-500 dark:text-slate-400"
          title={name}
        >
          {name}
        </p>
      </div>
      <div className="z-10 col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col justify-center gap-1 opacity-0 group-hover/iconcard:opacity-100 [&:has(:focus-visible)]:opacity-100">
        <CopyButton textToCopy={codeToCopy} />
        <Button
          text="Info"
          Icon={InformationCircleIcon}
          style="light"
          onClick={openDialog}
        />
      </div>
    </div>
  );
}
