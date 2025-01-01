import { XCircleIcon } from "@heroicons/react/24/outline";
import Link from "./Link";

export default function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="col-span-full flex flex-col gap-2 p-12 text-center">
      <XCircleIcon className="size-10 self-center text-slate-400 dark:text-slate-500" />
      <p>
        No icons found for <span className="font-bold">{searchQuery}</span>.
      </p>
      <p>
        <Link
          href="https://github.com/ndri/sidekickicons/discussions/new?category=icon-suggestions"
          newTab
        >
          Make a suggestion on GitHub.
        </Link>
      </p>
    </div>
  );
}
