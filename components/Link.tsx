"use client";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { default as NextLink } from "next/link";

export default function Link({
  href,
  newTab = false,
  children,
  ...rest
}: {
  href: string;
  newTab?: boolean;
  children: React.ReactNode;
}) {
  return (
    <NextLink
      href={href}
      target={newTab ? "_blank" : "_self"}
      rel={newTab ? "noopener noreferrer" : ""}
      prefetch={newTab ? false : true}
      className="inline-flex items-center gap-0.5 rounded-sm text-indigo-700 hover:text-indigo-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-indigo-400"
      {...rest}
    >
      {children}
      {newTab && <ArrowTopRightOnSquareIcon className="size-4" />}
    </NextLink>
  );
}
