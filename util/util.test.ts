import { toKebabCase } from "./util";

test("toKebabCase converts icon classes properly", () => {
  [
    ["Link", "link"],
    ["LinkSlash", "link-slash"],
    ["ArrowLeftEndOnRectangle", "arrow-left-end-on-rectangle"],
    ["XMark", "x-mark"],
    ["SpeakerXMark", "speaker-x-mark"],
    ["Bars3", "bars-3"],
    ["Bars3BottomLeft", "bars-3-bottom-left"],
    ["Squares2X2", "squares-2x2"],
    ["Square3Stack3D", "square-3-stack-3d"],
    ["H1", "h1"],
  ].forEach(([input, output]) => {
    expect(toKebabCase(input)).toBe(output);
  });
});
