import { HeartPulse } from "lucide-react";
import Card from "../shared/Card";
import EmptyState from "../shared/EmptyState";
import { LANGUAGES_BY_CODE } from "../../data/constants";

/**
 * FirstAidPanel — "Protocol being delivered to caller, in their
 * language" per the dashboard component table in the role doc. Shows
 * which guide is active and how far through it the caller is.
 */
export default function FirstAidPanel({ call }) {
  const language = call ? LANGUAGES_BY_CODE[call.language] : null;

  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <HeartPulse className="w-4 h-4 text-severity-critical" />
        <h3 className="font-bold text-ink-900 text-sm">
          First aid in progress
        </h3>
      </div>

      {!call?.firstAid ? (
        <EmptyState
          icon={HeartPulse}
          title="No guidance active"
          description="First-aid protocol will appear here once delivered to the caller."
        />
      ) : (
        <div>
          <p className="text-ink-900 font-semibold">{call.firstAid.protocol}</p>
          <p className="text-sm text-ink-500 mt-1">
            Delivered in {language?.label ?? "caller\u2019s language"} · Step{" "}
            {call.firstAid.currentStep} of {call.firstAid.totalSteps}
          </p>
          <div className="flex items-center gap-1.5 mt-3">
            {Array.from({ length: call.firstAid.totalSteps }).map((_, i) => (
              <div
                key={i}
                className={[
                  "h-1.5 flex-1 rounded-full",
                  i < call.firstAid.currentStep
                    ? "bg-severity-critical"
                    : "bg-nkwa-100",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
