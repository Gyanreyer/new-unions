/** Formats a 24-hour "HH:MM" time for display, e.g. "16:30" -> "4:30PM" */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours < 12 ? "AM" : "PM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return minutes === 0
    ? `${displayHours}${period}`
    : `${displayHours}:${String(minutes).padStart(2, "0")}${period}`;
}
