import { html, type YetiComponent } from "yeti-js";

export const Icon: YetiComponent<{
  name: string;
  label?: string | null;
} & Record<string, any>> = ({ name, label = null, ...spreadAttrs }) => {
  return html`${html.import(`/_icons/${name}.svg`, { bundleName: "icons" })}
  <svg xmlns="http://www.w3.org/2000/svg" role=${label ? "img" : "presentation"} ...${spreadAttrs}>
    <use href="${html.src("icons")}#${name}" />
    ${label ? html`<title>${label}</title>` : ""}
  </svg>`;
};