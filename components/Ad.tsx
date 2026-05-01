"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./Button";

const variants = {
  a: {
    headline: "Stop waiting weeks for user feedback",
    body: "Iterate faster than ever before by unleashing agentic AI personas on your product. Get brutally honest UX feedback in minutes with ClankerView.",
    ref: "sidekickicons-a",
  },
  b: {
    headline: "Ship with confidence, not guesswork",
    body: "ClankerView sends AI users through your product and tells you exactly what's broken before your real users find it.",
    ref: "sidekickicons-b",
  },
};

export default function Ad() {
  const [dismissed, setDismissed] = useState(false);
  const [variant, setVariant] = useState<
    (typeof variants)[keyof typeof variants] | null
  >(null);

  useEffect(() => {
    setVariant(Math.random() < 0.5 ? variants.a : variants.b);
  }, []);

  if (dismissed) return null;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
      <Image src="/clankerview.svg" alt="ClankerView logo" width={64} height={64} />
      <div className="flex grow flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex grow flex-col gap-1">
          <p className="text-xs text-amber-700 dark:text-amber-500">
            From the developer of Sidekickicons
          </p>
          {variant ? (
            <>
              <h2 className="font-semibold">{variant.headline}</h2>
              <p className="text-sm">{variant.body}</p>
            </>
          ) : (
            <>
              <div className="h-6 w-64 animate-pulse rounded bg-amber-100 dark:bg-amber-900" />
              <div className="h-5 w-full animate-pulse rounded bg-amber-100 dark:bg-amber-900" />
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button
            text="Try ClankerView"
            style="amber"
            size="lg"
            onClick={() =>
              window.open(
                `https://clankerview.com?ref=${variant?.ref ?? "sidekickicons"}`,
                "_blank",
              )
            }
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
