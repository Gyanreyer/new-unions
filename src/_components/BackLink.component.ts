import { css, html, type YetiComponent } from "yeti-js";
import { Icon } from "./Icon.component.ts";

export const BackLink: YetiComponent<{ href: string; label: string }> = ({ href, label }) => {
  return html`<a href="${href}" class="back-link underlined-link">
    <${Icon} name="arrow" class="back-link-icon" aria-hidden="true" width="1em" height="1em" />
    <span class="underline-target">${label}</span>
  </a>`;
}

BackLink.css = css`
${css.bundle("critical")}
.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3xs);
}

.back-link-icon {
  /* Flip the arrow icon to point back */
  transform: scaleX(-1);

  &:dir(rtl) {
    transform: none;
  }
}
`;