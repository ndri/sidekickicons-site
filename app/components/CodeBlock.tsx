import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./CopyButton";

export default function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  return (
    <div
      className="group/code relative w-full overflow-hidden rounded-md ring-1 ring-slate-200 dark:ring-slate-700"
      tabIndex={0}
    >
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        customStyle={{
          fontSize: "0.75rem",
          margin: "0rem",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
        }}
        className="flex-grow rounded-md"
      >
        {code}
      </SyntaxHighlighter>
      <div className="invisible absolute bottom-1 right-1 top-1 flex flex-row items-start gap-1 group-focus-within/code:visible group-hover/code:visible group-focus/code:visible">
        <CopyButton textToCopy={code} />
      </div>
    </div>
  );
}
