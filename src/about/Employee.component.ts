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
  html`<section class="employee-section">
    <div class="text-column">
      <h2>${name}</h2>
      <h3>${pronouns}, ${title}</h3>
      <p>${bio}</p>
    </div>
    <aside>
      <${ResponsiveImage} src=${imageSrc} alt=${imageAlt} />
    </aside>
  </section>`;

EmployeeSection.css = css`
  ${css.bundle("about")}
  .employee-section {
    display: flex;
    column-gap: var(--space-m-2xl);
    row-gap: var(--space-s);
    flex-wrap: wrap;

    margin-block-end: var(--space-2xl);
    max-width: 1200px;

    .text-column {
      flex: 1 1 300px;

      h2 {
        font-size: var(--font-size-2xl);
        font-weight: 400;
      }

      h3 {
        font-size: var(--font-size-l);
        font-weight: 300;
      }

      p {
        margin-block-start: var(--space-s);
      }
    }

    aside {
      min-width: 300px;
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
