import { MaskIcon } from "@sidekickicons/react/24/solid";
export default function Header() {
  return (
    <header className="w-full max-w-6xl p-8">
      <h1 className="mb-3 flex items-center gap-4 text-3xl font-bold text-slate-800">
        <MaskIcon className="size-12 text-indigo-600" />
        sidekickicons
      </h1>
      <p className="text-slate-500">Fanmade icons to complement Heroicons</p>
    </header>
  );
}
