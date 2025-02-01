"use client";

import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { FullHeroicon, HeroiconType, IconCodeType, IconSize } from "../types";
import { allIconSizeClasses, iconCodeFunctions } from "../util/constants";
import CopyButton from "./CopyButton";
import Button from "./Button";
import { useRef, useState, useEffect } from "react";

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
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const iconClasses = allIconSizeClasses[size][type];
  const Icon = fullHeroicon[type];
  const name = fullHeroicon.kebabName;
  const codeToCopy = iconCodeFunctions[codeType](fullHeroicon, type);

  // Handle clicking outside and tabbing away
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.relatedTarget as Node)) {
        setExpanded(false);
      }
    };

    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("focusout", handleFocusOut);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [expanded]);

  return (
    <div
      ref={cardRef}
      className="grid min-h-28 grid-cols-1 grid-rows-1"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <button
        className="col-span-full row-span-full rounded-lg bg-slate-50 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 dark:bg-slate-800"
        aria-expanded={expanded}
        aria-haspopup="true"
        aria-label={`${name} icon options`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); // Prevent space from scrolling
            setExpanded(true);
          }
          if (e.key === "Escape" && expanded) {
            setExpanded(false);
          }
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <Icon
            className={`${iconClasses} text-slate-700 dark:text-slate-100`}
            aria-hidden="true"
          />
          <p
            className="mt-2 max-w-full truncate text-xs text-slate-500 dark:text-slate-400"
            title={name}
          >
            {name}
          </p>
        </div>
      </button>
      {expanded && (
        <div
          className="z-10 col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col justify-center gap-1 p-4"
          role="menu"
          aria-label={`${name} icon options`}
        >
          <CopyButton textToCopy={codeToCopy} />
          <Button
            text="Info"
            Icon={InformationCircleIcon}
            style="light"
            onClick={openDialog}
          />
        </div>
      )}
    </div>
  );
}
