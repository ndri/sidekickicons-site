import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({
  code,
  language,
  style = "light",
}: {
  code: string;
  language: string;
  style?: "light" | "dark";
}) {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1337);
  }

  return (
    <div className="relative flex w-full flex-col">
      <SyntaxHighlighter
        language={language}
        style={style === "dark" ? oneDark : oneLight}
        customStyle={{ fontSize: "0.75rem" }}
      >
        {code}
      </SyntaxHighlighter>
      <button
        className="group absolute right-0 top-2 flex flex-row items-center gap-1 rounded-md px-2.5 py-1.5 ring-inset ring-slate-300 hover:border-slate-200 hover:bg-white hover:shadow-sm hover:ring-1"
        onClick={copyCode}
      >
        <span className="hidden text-sm font-medium group-hover:block">
          {copied ? "Copied!" : "Copy"}
        </span>
        {copied ? (
          <CheckIcon className="size-6 text-green-500" />
        ) : (
          <DocumentDuplicateIcon className="size-6 text-slate-500 group-hover:text-slate-700" />
        )}
      </button>
    </div>
  );
}
