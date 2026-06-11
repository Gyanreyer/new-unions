import { css, html } from "yeti-js";
import { ScrollingImageCarousel } from "../_components/ScrollingImageCarousel.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

const OFFERINGS = [
  "Bridal Gowns",
  "Short Wedding Dresses",
  "Colorful Wedding Dresses",
  "Bridal Jumpsuits",
  "Bridal Separates",
  "Vintage Wedding Dresses",
  "Unique Wedding Outfits",
  "Traditional & Colorful Veils",
  "Accessories",
  "Bridal Capes & Jackets",
  "Headpieces",
  "Jewelry",
  "Purses",
  "Wedding Gifts",
];

export const OfferingsSection = () => {
  // Break each offering into per-word / per-letter spans so every glyph can ride
  // its own point on the wave. One running index across the whole list keeps the
  // wave continuous from item to item. The spans are purely decorative
  // (aria-hidden); each <li> carries its real text via aria-label for AT.
  let charIndex = 0;
  const offeringItems = OFFERINGS.map((label) => {
    const words = label.split(" ").map((word) => {
      const letters = [...word].map((char) => {
        const letter = html`<span class="wavy-letter" style="--char-index: ${charIndex}">${char}</span>`;
        charIndex += 1;
        return letter;
      });
      // Advance past the inter-word gap too, so the wave stays evenly spaced.
      charIndex += 1;
      return html`<span class="wavy-word">${letters}</span>`;
    });
    // The trailing gap index is where this item's ✦ separator sits on the wave.
    const separatorIndex = charIndex - 1;
    return html`<li style="--sep-index: ${separatorIndex}" aria-label="${label}"><span aria-hidden="true">${words}</span></li>`;
  });

  return html`
    <section id="offerings">
      <h2 class="section-heading">
        We carry a variety of new, pre&#8209;loved, and vintage pieces.
      </h2>
      <${ScrollingImageCarousel}>
        <${ResponsiveImage}
          src="/img/offerings/ColorfulAccessories.jpg"
          alt=""
        />
        <${ResponsiveImage}
          src="/img/offerings/Floralshoulderdetaildress.jpg"
          alt=""
        />
        <${ResponsiveImage}
          src="/img/offerings/Accessories2.jpg"
          alt=""
        />
        <${ResponsiveImage}
          src="/img/offerings/SparkleDressandBag.jpg"
          alt=""
        />
        <${ResponsiveImage}
          src="/img/offerings/DavidJefferyBag2.jpg"
          alt=""
        />
      </${ScrollingImageCarousel}>
      <ul class="offering-list" role="list" aria-label="Offerings">
        ${offeringItems}
      </ul>
      <a href="/offerings" class="action-btn primary">View more product!</a>
    </section>
  `;
};

OfferingsSection.css = css`
  #offerings {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .section-heading {
      margin-block-end: var(--space-m-l);
    }

    .carousel-container {
      margin-block-end: var(--space-l);
    }

    .offering-list {
      font-weight: 500;
      font-style: italic;
      font-size: var(--font-size-xs);

      /* Amplitude of the wave; tune to taste. */
      --wave-height: 15%;
      --animation-duration: 5s;
      line-height: 2;

      @media (max-width: 600px) {
        --wave-height: 8%;
        --animation-duration: 2.5s;
      }

      li {
        display: inline;
      }

      /* Each word is one unbreakable unit so only the spaces *between* words can
         wrap. (Letters are inline-block for the transform, which would otherwise
         let the line break in the middle of a word.) Margin stands in for the
         inter-word space, since the generated markup has no whitespace nodes. */
      .wavy-word {
        display: inline-block;
        white-space: nowrap;
      }
      .wavy-word:not(:last-child) {
        margin-inline-end: 0.25em;
      }

      /* Every glyph rides its own point on the wave. The default is a static
         sampled sine so reduced-motion users still get the shape; with motion
         allowed it animates into a wave that rolls along the words. */
      .wavy-letter {
        display: inline-block;
        transform: translateY(calc(sin(var(--char-index) / 8 * 1turn) * var(--wave-height)));
      }

      @media (prefers-reduced-motion: no-preference) {
        .wavy-letter {
          /* The negative, index-scaled delay offsets each glyph's phase so the
             wave travels along the line instead of every letter bobbing in sync.
             Shrink the per-letter delay for a longer, lazier wavelength. */
          animation: offering-wave var(--animation-duration) ease-in-out infinite;
          animation-delay: calc(var(--char-index) * -0.08s);
        }

        /* The ✦ separators ride the same transform-based keyframe as the
           letters; --sep-index keeps each in phase with its neighbours. */
        li:not(:last-child) .wavy-word:last-child::after {
          animation: offering-wave var(--animation-duration) ease-in-out infinite;
          animation-delay: calc(var(--sep-index) * -0.08s);
        }
      }

      /* Decorative separator after the last word of every item but the last.
         Living inside that word's nowrap, inline-block box means it can't wrap
         onto a line on its own (no orphaned star) — which lets it be inline-block
         and ride the wave with the same performant transform as the letters.
         It sits inside the aria-hidden wrapper, so it's already hidden from AT,
         and the inline-block word boundaries still provide the inter-item break. */
      li:not(:last-child) .wavy-word:last-child::after {
        content: "✦";
        display: inline-block;
        font-weight: bold;
        font-size: var(--font-size-s);
        margin-inline: var(--space-2xs);
        transform: translateY(calc(sin(var(--sep-index) / 8 * 1turn) * var(--wave-height)));
      }
    }
  
    .action-btn {
      margin-block-start: var(--space-m);
    }
  }

  @keyframes offering-wave {
    0%,
    100% {
      transform: translateY(calc(var(--wave-height) * -1));
    }
    50% {
      transform: translateY(var(--wave-height));
    }
  }
`;
