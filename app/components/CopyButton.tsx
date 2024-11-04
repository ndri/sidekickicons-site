import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Button from "./Button";

export default function CopyButton({
  textToCopy,
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
    <Button
      text={copied ? "Copied!" : "Copy"}
      Icon={copied ? CheckCircleIcon : DocumentDuplicateIcon}
      style="light"
      onClick={copyText}
    />
  );
}
