import { css, html, type YetiPageComponent } from 'yeti-js';
import { PageBorderLayout } from '../_layout/PageBorderLayout.component.ts';
import { EmployeeSection } from './Employee.component.ts';
import { ResponsiveImage } from '../_components/ResponsiveImage.component.ts';

const AboutPage: YetiPageComponent = () => html`<${PageBorderLayout}>
  <header>
    <a href="/">&lt; Back</a>
    <a href="/" aria-label="New Unions Home Page">
      <${ResponsiveImage}
        src="/img/logo.png"
        alt="New Unions Bridal"
        width="1510"
        height="420"
        fetchpriority="high"
        loading="eager"
        sizes="(width >= 575px) 420px, 95vw"
      />
    </a>
  </header>
  <main>
    <h1 class="section-heading underlined">Here’s a little about us.</h1>
    <${EmployeeSection}
      name="Jess"
      pronouns="They/She"
      title="Owner"
      bio=${html`
        Jess wanted to create a space for people like themselves–queer,
        budget-conscious, and out of the binary of traditional bridal wear.
        With a love of small businesses, Jess strives to create a space where
        everyone can find a unique wedding outfit while being able to shop in-store and support local.
      `}
      imageSrc="/img/headshots/jess_3.jpg"
      imageAlt="Jess, posing in front of wedding attire on a rack behind them."
    />
    <${EmployeeSection}
      name="Harrison"
      pronouns="He/They"
      title="Human Resources"
      bio=${html`
        Harrison is the leader of our human resources department.
        Between walks and naps, Harrison stands for social justice
        and human rights for all. He believes community is powerful,
        and that shopping local is the best way to ethically consume
        under late stage capitalism.
      `}
      imageSrc="/img/headshots/harrison_1.jpg"
      imageAlt="Harrison the dog, looking handsome in an orange bowtie laying on a fluffy blanket on his favorite chair."
    />
  </main>
</${PageBorderLayout}>`;

AboutPage.css = css`
${css.bundle("about")}
  header {
    img {
      display: block;
      margin-inline: auto;
      margin-block-start: var(--space-l-xl);
      width: min(420px, 100%);
      height: auto;
      z-index: 100;
      view-transition-name: header-logo;
    }
  }

  h1 {
    margin-block: var(--space-xl-2xl) var(--space-l-3xl);
    margin-inline: auto;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default AboutPage;