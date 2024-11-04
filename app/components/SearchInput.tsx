import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchInput({
  searchQuery,
  setSearchQuery,
  placeholder,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-slate-400" />
        </div>
        <input
          id="search"
          name="search"
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
