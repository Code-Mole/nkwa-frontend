import { Phone, Globe2 } from "lucide-react";
import SeverityBadge from "../shared/SeverityBadge";
import IconBadge from "../shared/IconBadge";
import { SERVICES_BY_ID, LANGUAGES_BY_CODE } from "../../data/constants";
import { formatElapsed } from "../../utils/time";

/**
 * CallDetailHeader — sits above the brief/map/first-aid panels, giving
 * dispatchers the caller number, service, language, and elapsed time
 * for whichever call is currently selected.
 */
export default function CallDetailHeader({ call }) {
  if (!call) return null;
  const service = SERVICES_BY_ID[call.service];
  const language = LANGUAGES_BY_CODE[call.language];

  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div className="flex items-center gap-3">
        <IconBadge icon={service?.icon} tone={service?.tone} size="lg" />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-ink-900">
              {service?.label ?? call.service}
            </h1>
            <SeverityBadge
              severity={call.severity}
              size="sm"
              pulse={call.severity === "CRITICAL"}
            />
          </div>
          <div className="flex items-center gap-3 text-sm text-ink-500 mt-0.5">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> {call.callerNumber}
            </span>
            <span className="flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" />{" "}
              {language?.label ?? call.language}
            </span>
          </div>
        </div>
      </div>
      <span className="text-xs text-ink-400 flex-shrink-0 pt-1">
        Received {formatElapsed(call.receivedAt)}
      </span>
    </div>
  );
}
