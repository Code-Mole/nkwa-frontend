/**
 * formatElapsed — turns a `receivedAt` epoch ms timestamp into a short
 * "Xs ago" / "Xm ago" string for the live call feed.
 */
export function formatElapsed(receivedAt, now = Date.now()) {
  const diffSeconds = Math.max(0, Math.floor((now - receivedAt) / 1000));
  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

/**
 * formatClock — turns a relative-to-call-start second offset (used in
 * mock timeline data, e.g. -45) into a wall-clock-style mm:ss label
 * counting up from call start, for the call timeline view.
 */
export function formatClock(offsetSeconds) {
  const abs = Math.abs(offsetSeconds);
  const m = Math.floor(abs / 60)
    .toString()
    .padStart(2, "0");
  const s = (abs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
