import { MaskIcon } from "@sidekickicons/react/24/solid";
import { ShieldIcon } from "@sidekickicons/react/24/outline";

export default function Header() {
  return (
    <header className="flex w-full max-w-7xl flex-col items-center gap-4 px-4 pb-8 pt-8 sm:px-8 sm:pt-16">
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
        <a
          href="https://github.com/tailwindlabs/heroicons"
          className="rounded-sm text-indigo-700 hover:text-indigo-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-indigo-400"
        >
          your favourite icons
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/ndri/sidekickicons/"
          className="rounded-sm text-indigo-700 hover:text-indigo-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-indigo-400"
        >
          their fanmade companions
        </a>
        .
      </p>
    </header>
  );
}
