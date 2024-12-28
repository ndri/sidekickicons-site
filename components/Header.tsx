import { MaskIcon } from "@sidekickicons/react/24/solid";
import { ShieldIcon } from "@sidekickicons/react/24/outline";
import ThemeSelector from "./ThemeSelector";
import Link from "./Link";

export default function Header() {
  return (
    <header className="flex w-full max-w-7xl flex-col items-center gap-4 px-4 pb-8 pt-8 sm:px-8">
      <div className="flex w-full justify-end">
        <ThemeSelector />
      </div>
      <h1 className="flex items-center gap-3 text-lg font-bold sm:text-3xl">
        <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
          <ShieldIcon className="size-24 text-indigo-600 sm:size-12" />
          <span>heroicons</span>
        </div>
        <span className="text-3xl">+</span>
        <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
          <MaskIcon className="size-24 text-indigo-600 sm:size-12" />
          <span>sidekickicons</span>
        </div>
      </h1>
      <p className="text-center text-slate-500 dark:text-slate-400">
        Browse{" "}
        <Link href="https://github.com/tailwindlabs/heroicons" newTab>
          your favourite icons
        </Link>{" "}
        and{" "}
        <Link href="https://github.com/ndri/sidekickicons" newTab>
          their fanmade companions
        </Link>
        .
      </p>
    </header>
  );
}
