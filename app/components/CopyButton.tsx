import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function CopyButton({
  textToCopy,
  className = "",
}: {
  textToCopy: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  function copyText() {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1337);
  }

  return (
    <button
      className={`group/button flex justify-center gap-1 rounded bg-white px-2 py-1 text-xs font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 ${className}`}
      onClick={copyText}
    >
      {copied ? (
        <CheckIcon className="size-5 text-green-600" />
      ) : (
        <DocumentDuplicateIcon className="size-5 text-slate-400 group-hover/button:text-slate-600" />
      )}
      <span className="text-sm font-medium">{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}
