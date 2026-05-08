import { html } from "yeti-js";
import { bookAppointmentModalID as bookAppointmentModalID } from "./BookAppointmentModal.component.ts";

export const BookAppointmentButton = () => html`
  <button class="action-btn primary" commandfor=${bookAppointmentModalID} command="show-modal">Book an Appointment</button>
`;