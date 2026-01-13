import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { FullHeroicon, HeroiconType, IconCodeType } from "../types";
import DescriptionList from "./DescriptionList";
import CodeBlock from "./CodeBlock";
import {
  codeTypes,
  iconSizeClasses4x,
  iconTypeExplanations,
  iconTypeNames,
  iconTypes,
} from "../util/constants";
import {
  iconReactCode,
  iconReactPlusImportCode,
  iconSvelteCode,
  iconSveltePlusImportCode,
  iconSvgCode,
  iconSvgToJsx,
  iconVueCode,
  iconVuePlusImportCode,
  iconsetInstallCode,
} from "../util/code";
import ButtonSelect from "./ButtonSelect";
import Button from "./Button";
import Link from "./Link";
import useUrlState from "@/util/useUrlState";
import authorsData from "../data/authors.json";

export default function IconDetailsDialog({
  fullHeroicon,
  closeDialog,
}: {
  fullHeroicon: FullHeroicon;
  closeDialog: () => void;
}) {
  const [selectedType, setSelectedType] = useUrlState<HeroiconType>("type", {
    defaultValue: "outline24",
  });
  const [selectedCodeType, setSelectedCodeType] = useUrlState<IconCodeType>("code", {
    defaultValue: codeTypes[0],
  });
  const Icon = fullHeroicon[selectedType];

  // Get author data if available
  const authorInfo = (
    authorsData as Record<string, { author: string; authorLink: string; pr: string }>
  )[fullHeroicon.kebabName];

  const prettySvgCode = iconSvgCode(fullHeroicon, selectedType);
  const prettyJsxCode = iconSvgToJsx(prettySvgCode);
  const reactCode = iconReactCode(fullHeroicon, selectedType);
  const reactPlusImportCode = iconReactPlusImportCode(fullHeroicon, selectedType);
  const vueCode = iconVueCode(fullHeroicon, selectedType);
  const vuePlusImportCode = iconVuePlusImportCode(fullHeroicon, selectedType);
  const svelteCode = iconSvelteCode(fullHeroicon, selectedType);
  const sveltePlusImportCode = iconSveltePlusImportCode(fullHeroicon, selectedType);

  return (
    <Dialog open={true} onClose={closeDialog} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in dark:bg-slate-900 dark:bg-opacity-80" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 dark:bg-slate-800">
            <div className="flex flex-col items-center gap-6">
              <DialogTitle as="h3" className="text-center text-lg font-semibold">
                {fullHeroicon.kebabName}
              </DialogTitle>
              <div className="flex h-36 w-36 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700">
                <Icon className={iconSizeClasses4x[selectedType]} />
              </div>
              <ButtonSelect<HeroiconType>
                label="Icon type"
                selectedValue={selectedType}
                setSelectedValue={setSelectedType}
                values={iconTypes}
                labels={iconTypeNames}
              />
              <DescriptionList
                rows={[
                  ["Component", fullHeroicon.componentName],
                  ["Intended size", iconTypeExplanations[selectedType]],
                  ["Iconset", fullHeroicon.iconset],
                  ["Keywords", fullHeroicon.keywords.join(", ")],
                  ...(authorInfo
                    ? [
                        [
                          "Author",
                          <>
                            <Link href={authorInfo.authorLink} newTab>
                              {authorInfo.author}
                            </Link>
                            {" ("}
                            <Link href={authorInfo.pr} newTab>
                              PR
                            </Link>
                            {")"}
                          </>,
                        ] as [string, React.ReactNode],
                      ]
                    : []),
                ]}
              />

              <div className="flex w-full flex-col gap-2">
                <ButtonSelect<IconCodeType>
                  label="Code to copy"
                  selectedValue={selectedCodeType}
                  setSelectedValue={setSelectedCodeType}
                  values={codeTypes}
                />
                {selectedCodeType === "SVG" && (
                  <CodeBlock code={prettySvgCode} language="svg" />
                )}
                {selectedCodeType === "JSX" && (
                  <CodeBlock code={prettyJsxCode} language="jsx" />
                )}
                {selectedCodeType === "React" && (
                  <>
                    <CodeBlock
                      code={iconsetInstallCode(fullHeroicon.iconset, "react")}
                      language="bash"
                    />
                    <CodeBlock code={reactCode} language="jsx" />
                  </>
                )}
                {selectedCodeType === "React + import" && (
                  <>
                    <CodeBlock
                      code={iconsetInstallCode(fullHeroicon.iconset, "react")}
                      language="bash"
                    />
                    <CodeBlock code={reactPlusImportCode} language="jsx" />
                  </>
                )}
                {selectedCodeType === "Vue" && (
                  <>
                    <CodeBlock
                      code={iconsetInstallCode(fullHeroicon.iconset, "vue")}
                      language="bash"
                    />
                    <CodeBlock code={vueCode} language="jsx" />
                  </>
                )}
                {selectedCodeType === "Vue + import" && (
                  <>
                    <CodeBlock
                      code={iconsetInstallCode(fullHeroicon.iconset, "vue")}
                      language="bash"
                    />
                    <CodeBlock code={vuePlusImportCode} language="jsx" />
                  </>
                )}
                {selectedCodeType === "Svelte" && (
                  <>
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      There is no official Svelte package for Heroicons, so the
                      Sidekickicons package includes them too.
                    </div>
                    <CodeBlock
                      code={iconsetInstallCode(fullHeroicon.iconset, "svelte")}
                      language="bash"
                    />
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      The Svelte components already include the size class.
                    </div>
                    <CodeBlock code={svelteCode} language="jsx" />
                  </>
                )}
                {selectedCodeType === "Svelte + import" && (
                  <>
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      There is no official Svelte package for Heroicons, so the
                      Sidekickicons package includes them too.
                    </div>
                    <CodeBlock
                      code={iconsetInstallCode(fullHeroicon.iconset, "svelte")}
                      language="bash"
                    />
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      The Svelte components already include the size class.
                    </div>
                    <CodeBlock code={sveltePlusImportCode} language="jsx" />
                  </>
                )}
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
              <Button text="Close" style="light" onClick={closeDialog} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
