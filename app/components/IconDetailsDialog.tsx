import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { FullHeroicon, HeroiconType } from "../types";
import ReactDOMServer from "react-dom/server";
import DescriptionList from "./DescriptionList";
import beautify from "js-beautify";
import CodeBlock from "./CodeBlock";
import { iconSizeClasses, iconSizeClasses4x } from "../util/constants";

export default function IconDetailsDialog({
  open,
  setOpen,
  fullHeroicon,
  type,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  fullHeroicon: FullHeroicon;
  type: HeroiconType;
}) {
  const Icon = fullHeroicon[type];
  const svgCode = ReactDOMServer.renderToStaticMarkup(
    <Icon className={iconSizeClasses[type]} />,
  );
  const prettySvgCode = beautify.html(svgCode, {
    indent_size: 2,
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-36 w-36 items-center justify-center rounded-md border border-slate-200">
                <Icon className={`${iconSizeClasses4x[type]} text-slate-700`} />
              </div>
              <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                {fullHeroicon.kebabName}
              </DialogTitle>
              <DescriptionList
                rows={[
                  ["Component name", fullHeroicon.componentName],
                  ["Iconset", fullHeroicon.iconset],
                  ["Keywords", fullHeroicon.keywords.join(", ")],
                ]}
              />
              <CodeBlock code={prettySvgCode} language="svg" />
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
