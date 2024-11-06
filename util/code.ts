import ReactDOMServer from "react-dom/server";
import { FullHeroicon, HeroiconType } from "../types";
import { iconSizeClasses, iconDirectories } from "./constants";
import beautify from "js-beautify";
import { createElement } from "react";

export function iconSvgCode(fullHeroicon: FullHeroicon, type: HeroiconType) {
  const reactElement = fullHeroicon[type];
  const jsxElement = createElement(reactElement, {
    className: `${iconSizeClasses[type]} text-slate-500`,
  });
  const svgCode = ReactDOMServer.renderToStaticMarkup(jsxElement);
  const prettySvgCode = beautify.html(svgCode, { indent_size: 2 });
  return prettySvgCode;
}

export function iconSvgToJsx(svg: string) {
  return svg
    .replace(/\bclass=/g, "className=")
    .replace(/\bxml:space=/g, "xmlSpace=")
    .replace(/\bstroke-width="(.*?)"/g, "strokeWidth={$1}")
    .replace(/\bstroke-linecap=/g, "strokeLinecap=")
    .replace(/\bstroke-linejoin=/g, "strokeLinejoin=")
    .replace(/\baria-hidden=/g, "ariaHidden=")
    .replace(/\bdata-slot=/g, "dataSlot=")
    .replace(/\bfill-rule=/g, "fillRule=")
    .replace(/\bclip-rule=/g, "clipRule=");
}

export function iconJsxCode(fullHeroicon: FullHeroicon, type: HeroiconType) {
  const svgCode = iconSvgCode(fullHeroicon, type);
  const jsxCode = iconSvgToJsx(svgCode);
  return jsxCode;
}

export function iconImportCode(
  fullHeroicon: FullHeroicon,
  type: HeroiconType,
  framework: string,
) {
  const importCode = `import { ${fullHeroicon.componentName} } from "@${fullHeroicon.iconset.toLowerCase()}/${framework}/${iconDirectories[type]}";`;
  return importCode;
}

export function iconsetInstallCode(iconset: string, framework: string) {
  return `npm install @${iconset.toLowerCase()}/${framework}`;
}

export function iconReactCode(fullHeroicon: FullHeroicon, type: HeroiconType) {
  return `<${fullHeroicon.componentName} className="${iconSizeClasses[type]} text-slate-500" />`;
}

export function iconReactPlusImportCode(
  fullHeroicon: FullHeroicon,
  type: HeroiconType,
) {
  const importCode = iconImportCode(fullHeroicon, type, "react");
  const componentCode = iconReactCode(fullHeroicon, type);
  return `${importCode}\n\n${componentCode}`;
}

export function iconVueCode(fullHeroicon: FullHeroicon, type: HeroiconType) {
  return `<${fullHeroicon.componentName} class="${iconSizeClasses[type]} text-slate-500" />`;
}

export function iconVuePlusImportCode(fullHeroicon: FullHeroicon, type: HeroiconType) {
  const importCode = iconImportCode(fullHeroicon, type, "vue");
  const componentCode = iconVueCode(fullHeroicon, type);
  return `${importCode}\n\n${componentCode}`;
}
