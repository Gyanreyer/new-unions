import { css, html, type YetiPageComponent } from "yeti-js";

import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { EmployeeSection } from "./Employee.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeader } from "../_components/SecondaryPageMainSectionHeader.component.ts";
import { ScrollingImageCarousel } from "../_components/ScrollingImageCarousel.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";
import { SparkleGroup } from "../_components/SparkleGroup/SparkleGroup.ts";
import { Sparkle } from "../_components/SparkleGroup/Sparkle.component.ts";

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-11-12",
};

const carouselImages: Array<{ src: string; alt: string }> = [
  {
    src: "/img/other/lace-bodice-jumpsuit-by-ladder.jpg",
    alt: "Person in an ivory bridal jumpsuit with a lace bodice, leaning on a wooden ladder in front of a draped cream backdrop",
  },
  {
    src: "/img/core/aerial-shoot-cake.jpg",
    alt: "Smiling couple in the woods feeding each other cake, one in a black suit and one in a strappy white gown, beside a tiered white cake with red piping",
  },
  {
    src: "/img/accessories/black-lace-veil-sepia.jpg",
    alt: "Sepia photo of a couple about to kiss under a sheer black veil with a ruffled edge, one holding an aerial strap overhead",
  },
  {
    src: "/img/core/short-dress-red-aerial-silks-sunset.jpg",
    alt: "Person in a short strapless white dress balancing on red aerial silks hung from a rig in a sunlit park",
  },
  {
    src: "/img/other/veil-over-face-lace-corset.jpg",
    alt: "Person with a sheer veil draped over their face and shoulders, wearing a lace corset top",
  },
];

const AboutPage: YetiPageComponent = ({
  page,
}) => html`<${PageBorderLayout} page=${page}>
  <${SecondaryPageNavHeader} />
  <main>
    <${SecondaryPageMainSectionHeader}>
      <h1>Here’s a little about us.</h1>
    </${SecondaryPageMainSectionHeader}>
    <${ScrollingImageCarousel}>
        ${carouselImages.map((image) => html`
      <${ResponsiveImage} src=${image.src} alt=${image.alt} />
      `)}
    </${ScrollingImageCarousel}>
    <div class="about-description sparkle-anchor">
      <${SparkleGroup} anchor="top-start" class="about-description-sparkles-top" size="var(--sparkle-group-size)">
        <${Sparkle} x="-0.5" y="-0.75" />
        <${Sparkle} x="-1.25" y="-0.85" scale="0.35" />
        <${Sparkle} x="-0.85" y="0" scale="0.5" />
      </${SparkleGroup}>
      <h2>
        Metro Detroit&rsquo;s premier inclusive bridal boutique
      </h2>
      <p>
        At New Unions Bridal, finding your dream wedding attire is an unforgettable, stress-free celebration
        for <strong>every body</strong> and <strong>every love story</strong>.
      </p>
      <p>
        Our Ferndale shop sits in the heart of the Detroit metropolitan area,
        welcoming couples from Royal Oak, Birmingham, Ann Arbor, and all over Southeast Michigan.
        We specialize in <strong>affordable wedding dresses</strong>, budget-friendly bridal gowns,
        off-the-rack designer styles, and modern bridal separates that <strong>never compromise on quality or craftsmanship</strong>.
      </p>
      <p>
        As a proudly <strong>LGBTQ+ owned</strong> and operated, queer-friendly bridal shop,
        we offer a judgment-free, affirming space dedicated to size-inclusive
        bridal fashion, plus-size wedding gowns, and non-traditional wedding outfits.
      </p>
      <p>
        Whether you are planning a classic Michigan ballroom wedding,
        an intimate backyard ceremony, or a downtown Detroit elopement,
        we are here to help you say &ldquo;yes&rdquo; to a look that feels <strong>authentically you</strong>.
      </p>
      <${SparkleGroup} anchor="bottom-end" class="about-description-sparkles-bottom" size="var(--sparkle-group-size)">
        <${Sparkle} x="-0.5" y="0.5" />
        <${Sparkle} x="-0.1" y="-0.3" scale="0.55" />
        <${Sparkle} x="0.2" y="0.6" scale="0.35" />
      </${SparkleGroup}>
    </div>
    <section id="team">
      <h2 class="section-heading">Meet our team</h2>
      <${EmployeeSection}
        name="Jess"
        pronouns="They/She"
        title="Owner"
        bio=${html`
          Jess wanted to create a space for people like themselves–queer,
          budget-conscious, and out of the binary of traditional bridal wear.
          With a love of small businesses, Jess strives to create a space where
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
    </section>
    <${ScrollingImageCarousel} direction="right">
        ${carouselImages.map((image) => html`
      <${ResponsiveImage} src=${image.src} alt=${image.alt} />
      `)}
    </${ScrollingImageCarousel}>
  </main>
</${PageBorderLayout}>`;

AboutPage.css = css`
  main {
    justify-items: center;

    .about-description {
      text-align: center;
      text-wrap: pretty;
      margin-block: var(--space-s) var(--space-xl);
      max-inline-size: 48ch;

    --sparkle-group-size: clamp(28px, 4cqi, 44px);

      h2 {
        margin-block-end: var(--space-s);
      }

      p:not(:last-child) {
        margin-block-end: var(--space-xs);
      }

      @media (width < 900px) {
        .about-description-sparkles-top {
          --sparkle-group-offset-x: 1;
          --sparkle-group-offset-y: -0.15;

          .sparkle:nth-of-type(3) {
            --sparkle-x: -1;
            --sparkle-y: -0.27;
          }
        }
      }
    }

    .carousel-container {
      margin-block-end: var(--space-2xl);
    }

    #team {
      h2 {
        text-align: center;
        text-underline-offset: var(--space-xs);
        line-height: calc(1em + var(--space-2xs) + 1px);
        text-decoration: underline 3px;
        margin-block-end: var(--space-l);
      }

      .employee-section:not(:last-of-type) {
        margin-block-end: var(--space-2xl);
      }

      margin-block-end: var(--space-xl);
    }
  }
`;

export default AboutPage;
