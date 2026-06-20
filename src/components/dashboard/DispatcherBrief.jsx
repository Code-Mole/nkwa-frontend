import { FileText, Sparkles, Truck } from "lucide-react";
import SeverityBadge from "../shared/SeverityBadge";
import Card from "../shared/Card";
import { SERVICES_BY_ID } from "../../data/constants";

/**
 * DispatcherBrief — "AI-generated dispatcher brief panel (incident type,
 * severity, recommended response unit)" per the role doc. This is the
 * panel that should populate visibly during the judged demo, so the
 * confidence + summary read clearly at a glance.
 *
 * BACKEND TODO: `call.brief` should come from the Bedrock (Claude)
 * triage output, per the AWS Services table — confirm the exact field
 * names with the AI/ML engineer before wiring this to real data; the
 * shape used here (incidentType, severity, recommendedUnit, confidence,
 * summary) is our best guess, not a confirmed schema.
 */
export default function DispatcherBrief({ call }) {
  if (!call) return null;
  const { brief } = call;
  const service = SERVICES_BY_ID[call.service];
  const confidencePct =
    brief?.confidence != null ? Math.round(brief.confidence * 100) : null;
  const isTriaging = brief?.incidentType === "Triage in progress…";

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-nkwa-600" />
          <h3 className="font-bold text-ink-900 text-sm">Dispatcher brief</h3>
        </div>
        <SeverityBadge severity={call.severity} size="sm" />
      </div>

      <div>
        <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1">
          Incident type
        </p>
        {isTriaging ? (
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-nkwa-400 animate-pulse" />
            <p className="text-ink-400 italic text-sm">
              AI is analysing the call…
            </p>
          </div>
        ) : (
          <p className="text-ink-900 font-semibold animate-fade-in">
            {brief.incidentType}
          </p>
        )}
      </div>

      {brief?.summary && (
        <div className="animate-fade-in">
          <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1">
            Summary
          </p>
          <p className="text-ink-700 text-sm leading-relaxed">
            {brief.summary}
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 pt-1">
        <div className="flex-1 flex items-center gap-2 bg-nkwa-50 rounded-xl px-3 py-2.5">
          <Truck className="w-4 h-4 text-nkwa-600 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] text-ink-500 leading-none mb-0.5">
              Recommended unit
            </p>
            <p className="text-sm font-semibold text-ink-900 truncate">
              {brief?.recommendedUnit ??
                `${service?.label ?? "Unit"} — pending`}
            </p>
          </div>
        </div>

        {confidencePct != null && (
          <div className="flex items-center gap-2 bg-nkwa-50 rounded-xl px-3 py-2.5 animate-fade-in">
            <Sparkles className="w-4 h-4 text-nkwa-600 flex-shrink-0" />
            <div>
              <p className="text-[11px] text-ink-500 leading-none mb-0.5">
                AI confidence
              </p>
              <p className="text-sm font-semibold text-ink-900">
                {confidencePct}%
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
