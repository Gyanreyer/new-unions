import { css, html, type YetiPageComponent } from "yeti-js";

import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { EmployeeSection } from "./Employee.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeading } from "../_components/SecondaryPageMainSectionHeading.component.ts";

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-05-29",
};

const AboutPage: YetiPageComponent = ({
  page,
}) => html`<${PageBorderLayout} url=${page.url}>
  <${SecondaryPageNavHeader} />
  <main>
    <${SecondaryPageMainSectionHeading}>
      Here’s a little about us.
    </${SecondaryPageMainSectionHeading}>
    <${EmployeeSection}
      name="Jess"
      pronouns="They/She"
      title="Owner"
      bio=${html`
        Jess wanted to create a space for people like themselves–queer,
        budget-conscious, and out of the binary of traditional bridal wear. With
        a love of small businesses, Jess strives to create a space where
        everyone can find a unique wedding outfit while being able to shop
        in-store and support local.
      `}
      imageSrc="/img/headshots/jess_3.jpg"
      imageAlt="Jess, posing in front of wedding attire on a rack behind them."
    />
    <${EmployeeSection}
      name="Harrison"
      pronouns="He/They"
      title="Human Resources"
      bio=${html`
        Harrison is the leader of our human resources department. Between walks
        and naps, Harrison stands for social justice and human rights for all.
        He believes community is powerful, and that shopping local is the best
        way to ethically consume under late stage capitalism.
      `}
      imageSrc="/img/headshots/harrison_1.jpg"
      imageAlt="Harrison the dog, looking handsome in an orange bowtie laying on a fluffy blanket on his favorite chair."
    />
  </main>
</${PageBorderLayout}>`;

AboutPage.css = css`
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default AboutPage;
