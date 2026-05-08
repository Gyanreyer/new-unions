import { html, css } from "yeti-js";

export const bookAppointmentModalID = "book-appt-modal";

export const BookAppointmentModal = () => html`
<dialog id="${bookAppointmentModalID}" class="appointment-modal">
  <h2>Book an Appointment</h2>
  <a class="action-btn primary" href="https://calendar.proton.me/u/0/bookings#94R1UdAukt3JdhyTwciYyyJRLxn81skWQARs_E2CPb8=">Book an Appointment</a>
</dialog>
`;

BookAppointmentModal.css = css`
${css.bundle("components")}
#${bookAppointmentModalID} {
  border: none;
  border-radius: 8px;
  padding: var(--space-l);

  transition-property: translate, opacity, display;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
  transition-behavior: allow-discrete;

  &[open] {
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
  }
}

:root:has(#${bookAppointmentModalID}[open]) {
  /* Prevent background scrolling when modal is open */
  overflow: clip;
}
`;