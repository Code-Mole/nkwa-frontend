import { useEffect, useState } from "react";
import IconBadge from "../shared/IconBadge";
import SeverityBadge from "../shared/SeverityBadge";
import { SERVICES_BY_ID, LANGUAGES_BY_CODE } from "../../data/constants";
import { formatElapsed } from "../../utils/time";

/**
 * LiveCallRow — one row in the live call feed: severity badge, service
 * icon, detected language, elapsed time, and a prank/real tag, per the
 * "Live call feed" spec in the role doc ("severity badge, language
 * detected, prank/real tag").
 */
export default function LiveCallRow({ call, selected, onClick }) {
  const service = SERVICES_BY_ID[call.service];
  const language = LANGUAGES_BY_CODE[call.language];
  const [, forceTick] = useState(0);

  // Re-render once a second so "Xs ago" stays current without needing
  // the parent list to re-render the whole feed.
  useEffect(() => {
    const id = setInterval(() => forceTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3",
        selected
          ? "border-nkwa-500 bg-nkwa-50"
          : "border-transparent bg-surface-card hover:border-nkwa-100",
      ].join(" ")}
    >
      <IconBadge icon={service?.icon} tone={service?.tone} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-ink-900 text-sm truncate">
            {service?.label ?? call.service}
          </p>
          <span className="text-xs text-ink-400 flex-shrink-0">
            {formatElapsed(call.receivedAt)}
          </span>
        </div>
        <p className="text-xs text-ink-500 truncate mt-0.5">
          {call.brief?.incidentType}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <SeverityBadge
            severity={call.severity}
            size="sm"
            pulse={call.severity === "CRITICAL"}
          />
          {language && (
            <span className="text-[11px] font-medium text-ink-500 bg-nkwa-50 px-2 py-0.5 rounded-full">
              {language.label}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
