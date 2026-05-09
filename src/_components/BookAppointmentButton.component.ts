import { css, html } from "yeti-js";
import { bookAppointmentModalID as bookAppointmentModalID } from "./BookAppointmentModal.component.ts";

export const BookAppointmentButton = () => html`
  <button type="button" class="book-appt action-btn primary" commandfor=${bookAppointmentModalID} command="show-modal">Book an Appointment</button>
`;