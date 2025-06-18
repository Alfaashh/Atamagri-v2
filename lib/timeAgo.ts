import { formatDistanceToNow } from "date-fns";

export function timeAgo(date: Date | number | string): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}
