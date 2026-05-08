import { css, html, type YetiComponent } from "yeti-js";

export const BackLink: YetiComponent<{ href: string; label: string }> = ({ href, label }) => {
  return html`<a href="${href}" class="back-link underlined-link">&lt; <span class="underline-target">${label}</span></a>`;
}

BackLink.css = css`
${css.bundle("components")}
.back-link {
  display: inline-block;
}
`;