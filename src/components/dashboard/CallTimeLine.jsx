import {
  Phone,
  FileText,
  Sparkles,
  MapPinned,
  HeartPulse,
  Truck,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import Card from "../shared/Card";
import { formatClock } from "../../utils/time";

const TYPE_ICON = {
  call_received: Phone,
  transcription: FileText,
  triage: Sparkles,
  location: MapPinned,
  first_aid: HeartPulse,
  dispatched: Truck,
  resolved: CheckCircle2,
  queued: Clock3,
};

/**
 * CallTimeline — "Transcription, triage decision, first-aid delivery,
 * time stamps" per the role doc's Call timeline component spec.
 *
 * BACKEND TODO: `call.timeline` events should stream in over the same
 * WebSocket connection as the call itself, appended in real time rather
 * than arriving as a static array. The timestamp field here is a
 * seconds-from-call-start offset for the mock data; confirm whether the
 * real backend sends offsets or absolute epoch timestamps.
 */
export default function CallTimeline({ call }) {
  if (!call) return null;

  return (
    <Card>
      <h3 className="font-bold text-ink-900 text-sm mb-4">Call timeline</h3>
      <ol className="space-y-0">
        {call.timeline.map((event, i) => {
          const Icon = TYPE_ICON[event.type] ?? Clock3;
          const isLast = i === call.timeline.length - 1;
          return (
            <li key={event.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-nkwa-50 text-nkwa-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5" strokeWidth={2.25} />
                </div>
                {!isLast && <div className="w-px flex-1 bg-nkwa-100 my-1" />}
              </div>
              <div className={isLast ? "pb-0" : "pb-4"}>
                <p className="text-sm font-medium text-ink-900">
                  {event.label}
                </p>
                <p className="text-xs text-ink-400 mt-0.5">
                  {formatClock(event.timestamp)}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
