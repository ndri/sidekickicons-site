import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./CopyButton";

export default function CodeBlock({
  code,
  language,
  style = "light",
}: {
  code: string;
  language: string;
  style?: "light" | "dark";
}) {
  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-md ring-1 ring-slate-200">
      <SyntaxHighlighter
        language={language}
        style={style === "dark" ? oneDark : oneLight}
        customStyle={{
          fontSize: "0.75rem",
          margin: 0,
          paddingTop: "0.75rem",
          paddingBottom: "2rem",
        }}
        className="rounded-md"
      >
        {code}
      </SyntaxHighlighter>
      <CopyButton textToCopy={code} className="absolute bottom-1 right-1" />
    </div>
  );
}
