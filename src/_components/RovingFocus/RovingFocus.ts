import { css, html, js, type YetiComponent } from "yeti-js";

/**
 * Makes a group of focusable items one tab stop ("roving tabindex"), via the
 * `<roving-focus>` custom element (see roving-focus.ts). Tab enters and leaves
 * the group; Left/Right arrows move between items, Home/End jump to the ends.
 *
 * Give it an `id`, and mark each item with `data-roving-focus-id` set to
 * that id:
 *
 * ```ts
 * <${RovingFocus} id="loulette-photos">
 *   <${ScrollableList} label="Photos">
 *     ${photos.map((p) => html`<li>…<button data-roving-focus-id="loulette-photos">…</button></li>`)}
 *   </${ScrollableList}>
 * </${RovingFocus}>
 * ```
 *
 * The items must already be focusable (buttons, links). Without JS each item
 * is its own tab stop.
 */
export const RovingFocus: YetiComponent<{
  id: string;
  class?: string;
}> = ({ children, ...attrs }) => {
  if (!attrs.id) {
    throw new Error("RovingFocus: `id` is required (items reference it in `data-roving-focus-id`)");
  }
  return html`<roving-focus ...${attrs}>${children}</roving-focus>`;
};

RovingFocus.css = css`
${css.bundle("components")}
roving-focus {
  display: block;
}
`;

RovingFocus.js = js`
  ${js.import("./roving-focus.ts")}
`;
