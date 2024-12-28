import { ScaleIcon } from "@heroicons/react/20/solid";
import Link from "./Link";

export default function Footer() {
  return (
    <footer className="text flex w-full max-w-7xl flex-col gap-2 p-4 text-center text-sm text-slate-500 sm:p-8 dark:text-slate-400">
      <p>
        <Link href="https://github.com/tailwindlabs/heroicons" newTab>
          Heroicons
        </Link>{" "}
        are created by{" "}
        <Link href="https://www.steveschoger.com/" newTab>
          Steve Schoger
        </Link>{" "}
        and the{" "}
        <Link href="https://tailwindcss.com/" newTab>
          TailwindCSS
        </Link>{" "}
        team.
      </p>
      <p>
        <Link href="https://github.com/ndri/sidekickicons" newTab>
          Sidekickicons
        </Link>{" "}
        are created by{" "}
        <Link href="https://andri.io/" newTab>
          Andri Soone
        </Link>
        .
      </p>
      <p>
        Both iconsets are MIT-licensed. <ScaleIcon className="inline size-5" />
      </p>
    </footer>
  );
}
