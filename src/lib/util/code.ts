import type { Framework, FullHeroicon, Heroicon, HeroiconType } from "../types";
import { iconSizeClasses, iconDirectories } from "./constants";
import beautify from "js-beautify";

export function svgWithClass(svg: Heroicon, className: string) {
  return svg.replace(/^<svg([^>]*)>/, `<svg$1 class="${className}">`);
}

export function iconSvgCode(fullHeroicon: FullHeroicon, type: HeroiconType) {
  const svgCode = svgWithClass(fullHeroicon[type], iconSizeClasses[type]);
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

export function npmPackageName(iconset: string, framework: Framework) {
  // Heroicons has no official Svelte or React Native package, so ours include them
  if (framework === "svelte" || framework === "react-native") {
    return `@sidekickicons/${framework}`;
  }

  return `@${iconset.toLowerCase()}/${framework}`;
}

export function iconImportCode(
  fullHeroicon: FullHeroicon,
  type: HeroiconType,
  framework: Framework,
) {
  const importPart = `import { ${fullHeroicon.componentName} } from `;
  const npmPackage = npmPackageName(fullHeroicon.iconset, framework);
  const packagePart = `"${npmPackage}/${iconDirectories[type]}"`;

  return `${importPart}${packagePart};`;
}

export function iconsetInstallCode(iconset: string, framework: Framework) {
  const peerDependencies = framework === "react-native" ? " react-native-svg" : "";
  return `npm install ${npmPackageName(iconset, framework)}${peerDependencies}`;
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

export function iconSvelteCode(fullHeroicon: FullHeroicon, type: HeroiconType) {
  return `<${fullHeroicon.componentName} class="text-slate-500" />`;
}

export function iconSveltePlusImportCode(
  fullHeroicon: FullHeroicon,
  type: HeroiconType,
) {
  const importCode = iconImportCode(fullHeroicon, type, "svelte");
  const componentCode = iconSvelteCode(fullHeroicon, type);
  return `${importCode}\n\n${componentCode}`;
}

export function iconReactNativeCode(fullHeroicon: FullHeroicon, type: HeroiconType) {
  return `<${fullHeroicon.componentName} color="#64748b" />`;
}

export function iconReactNativePlusImportCode(
  fullHeroicon: FullHeroicon,
  type: HeroiconType,
) {
  const importCode = iconImportCode(fullHeroicon, type, "react-native");
  const componentCode = iconReactNativeCode(fullHeroicon, type);
  return `${importCode}\n\n${componentCode}`;
}
