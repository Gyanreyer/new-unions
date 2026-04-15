import { html, type YetiComponent } from "yeti-js";

export const Icon: YetiComponent<{
  name: string;
  label: string;
} & Record<string, any>> = ({ name, label, ...spreadAttrs }) => {
  return html`${html.import(`/_icons/${name}.svg`, { bundleName: "icons" })}
  <svg xmlns="http://www.w3.org/2000/svg" ...${spreadAttrs}>
    <use href="${html.src("icons")}#${name}" />
    <title>${label}</title>
  </svg>`;
};