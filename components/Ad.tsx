"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "./Button";

export default function Ad() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
      <Image src="/clankerview.svg" alt="ClankerView logo" width={64} height={64} />
      <div className="flex grow flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex grow flex-col gap-1">
          <p className="text-xs text-amber-700 dark:text-amber-500">
            From the developer of Sidekickicons
          </p>
          <h2 className="font-semibold">Stop waiting weeks for user feedback</h2>
          <p className="text-sm">
            Iterate faster than ever before by unleashing agentic AI personas on your
            product. Get brutally honest UX feedback in minutes with ClankerView.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            text="Try ClankerView"
            style="amber"
            size="lg"
            href="https://clankerview.com?utm_source=sidekickicons&utm_campaign=variant-a"
            className="whitespace-nowrap"
          />
          <Button
            text="Dismiss"
            style="light"
            size="sm"
            onClick={() => setDismissed(true)}
            className="whitespace-nowrap"
          />
        </div>
      </div>
    </div>
  );
}
