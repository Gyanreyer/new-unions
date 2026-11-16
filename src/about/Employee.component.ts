import { css, html, type YetiComponent } from "yeti-js";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

export const EmployeeSection: YetiComponent<{
  name: string;
  pronouns: string;
  title: string;
  bio: string;
  imageSrc: string;
  imageAlt: string;
}> = ({ name, pronouns, title, bio, imageSrc, imageAlt }) =>
    html`<article class="employee-section">
    <div class="text-column">
      <h3>${name}</h3>
      <p class="employee-role">${pronouns}, ${title}</p>
      <p>${bio}</p>
    </div>
    <aside>
      <${ResponsiveImage} src=${imageSrc} alt=${imageAlt} />
    </aside>
  </article>`;

EmployeeSection.css = css`
  .employee-section {
    display: flex;
    column-gap: var(--space-m-2xl);
    row-gap: var(--space-s);
    flex-wrap: wrap;

    .text-column {
      flex: 1 1 300px;

      h3 {
        font-size: var(--font-size-2xl);
        font-weight: 400;
      }

      .employee-role {
        margin-block-start: 0;
        font-size: var(--font-size-l);
        font-weight: 300;
      }

      p {
        margin-block-start: var(--space-s);
      }
    }

    aside {
      flex: 0 1;
      min-width: min(300px, 100%);

      img {
        width: 100%;
        height: auto;
        border-radius: 24px;
        aspect-ratio: 92/100;
        object-fit: cover;
      }
    }
  }
`;
