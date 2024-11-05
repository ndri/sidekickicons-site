import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
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
  iconSvgCode,
  iconSvgToJsx,
  iconVueCode,
  iconVuePlusImportCode,
  iconsetInstallCode,
} from "../util/code";
import { useState } from "react";
import ButtonSelect from "./ButtonSelect";
import Button from "./Button";

export default function IconDetailsDialog({
  open,
  setOpen,
  fullHeroicon,
  defaultType,
  defaultCodeType,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  fullHeroicon: FullHeroicon;
  defaultType: HeroiconType;
  defaultCodeType: IconCodeType;
}) {
  const [selectedType, setSelectedType] = useState<HeroiconType>(defaultType);
  const Icon = fullHeroicon[selectedType];

  const prettySvgCode = iconSvgCode(fullHeroicon, selectedType);
  const prettyJsxCode = iconSvgToJsx(prettySvgCode);
  const reactCode = iconReactCode(fullHeroicon, selectedType);
  const reactPlusImportCode = iconReactPlusImportCode(fullHeroicon, selectedType);
  const vueCode = iconVueCode(fullHeroicon, selectedType);
  const vuePlusImportCode = iconVuePlusImportCode(fullHeroicon, selectedType);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in dark:bg-slate-900 dark:bg-opacity-80" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 dark:bg-slate-800">
            <div className="flex flex-col items-center gap-6">
              <DialogTitle as="h3" className="text-lg font-semibold">
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
                ]}
              />

              <TabGroup
                className="flex w-full flex-col gap-2"
                defaultIndex={codeTypes.indexOf(defaultCodeType)}
              >
                <TabList className="flex flex-row flex-wrap gap-0.5">
                  {codeTypes.map((tab) => (
                    <Tab
                      key={tab}
                      className="rounded-lg px-2 py-1 text-sm font-medium text-slate-600 data-[selected]:bg-indigo-50 data-[hover]:text-slate-400 data-[selected]:text-indigo-800 dark:text-slate-400 dark:hover:text-slate-500 dark:data-[selected]:bg-indigo-900 dark:data-[hover]:text-slate-500 dark:data-[selected]:text-slate-100"
                    >
                      {tab}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <CodeBlock code={prettySvgCode} language="svg" />
                  </TabPanel>
                  <TabPanel>
                    <CodeBlock code={prettyJsxCode} language="jsx" />
                  </TabPanel>
                  <TabPanel className="flex flex-col gap-2">
                    <CodeBlock
                      code={iconsetInstallCode(fullHeroicon.iconset, "react")}
                      language="bash"
                    />
                    <CodeBlock code={reactCode} language="jsx" />
                  </TabPanel>
                  <TabPanel className="flex flex-col gap-2">
                    <CodeBlock
                      code={iconsetInstallCode(fullHeroicon.iconset, "react")}
                      language="bash"
                    />
                    <CodeBlock code={reactPlusImportCode} language="jsx" />
                  </TabPanel>
                  <TabPanel className="flex flex-col gap-2">
                    <CodeBlock
                      code={iconsetInstallCode(fullHeroicon.iconset, "vue")}
                      language="bash"
                    />
                    <CodeBlock code={vueCode} language="jsx" />
                  </TabPanel>
                  <TabPanel className="flex flex-col gap-2">
                    <CodeBlock
                      code={iconsetInstallCode(fullHeroicon.iconset, "vue")}
                      language="bash"
                    />
                    <CodeBlock code={vuePlusImportCode} language="jsx" />
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
              <Button text="Close" style="light" onClick={() => setOpen(false)} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
