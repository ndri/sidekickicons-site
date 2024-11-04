import { MaskIcon } from "@sidekickicons/react/24/solid";
import { ShieldIcon } from "@sidekickicons/react/24/outline";

export default function Header() {
  return (
    <header className="flex w-full max-w-7xl flex-col items-center p-4 sm:p-8">
      <h1 className="mb-3 flex items-center gap-3 text-lg font-bold sm:text-3xl">
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
        Browse your favourite icons and their fanmade companions.
      </p>
    </header>
  );
}
