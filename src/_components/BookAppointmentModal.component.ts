import { html, css } from "yeti-js";

export const bookAppointmentModalID = "book-appt-modal";

// Appt scheduling link: https://calendar.proton.me/u/0/bookings#94R1UdAukt3JdhyTwciYyyJRLxn81skWQARs_E2CPb8=

export const BookAppointmentModal = () => html`
<dialog id="${bookAppointmentModalID}" class="appointment-modal" closedby="any">
  <button aria-label="Close" type="button" commandfor="${bookAppointmentModalID}" command="close">&#x2715;</button>
  <h2>Book an Appointment</h2>
  <p>Appointment booking will open on May 30th.</p>
  <p>Stay tuned!</p>
</dialog>
`;

BookAppointmentModal.css = css`
${css.bundle("components")}
#${bookAppointmentModalID} {
  border: none;
  border-radius: 8px;
  padding: var(--space-xl) var(--space-l);

  transition-property: translate, opacity, display, overlay;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
  transition-behavior: allow-discrete;

  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    
    transition-property: opacity, display;
    transition-duration: inherit;
    transition-timing-function: inherit;
  }

  &[open] {
    &::backdrop {
      @starting-style {
        opacity: 0;
      }
    }

    /* Pre-Entry State */
    @starting-style {
      translate: 0 20px;
      opacity: 0;
    }
  }

  /* Exiting State */
  &:not([open]) {
    translate: 0 20px;
    opacity: 0;

    &::backdrop {
      opacity: 0;
    }
  }

  [aria-label="Close"] {
    position: absolute;
    inset-block-start: var(--space-s);
    inset-inline-end: var(--space-s);
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    font-size: var(--font-size-s);
  }

  h2 {
    margin-block-end: var(--space-xs);
  }
}

:root:has(#${bookAppointmentModalID}[open]) {
  /* Prevent background scrolling when modal is open */
  overflow: hidden;
  scrollbar-gutter: stable;
}
`;