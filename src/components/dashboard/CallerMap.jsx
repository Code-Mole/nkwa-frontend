import { MapPin, Navigation } from "lucide-react";
import Card from "../shared/Card";
import EmptyState from "../shared/EmptyState";

/**
 * CallerMap — "Map view showing caller location with landmark pin and
 * directions" per the role doc. This currently renders a stylised
 * placeholder map rather than a real tile-based map, since there's no
 * map provider/API key wired up yet.
 *
 * BACKEND TODO: once an AWS account exists, this is the natural place
 * to mount an actual map using AWS Location Service's map resource
 * (Maps SDK for JavaScript, or MapLibre GL with an AWS Location style
 * endpoint). Swap the placeholder <div> below for a real map
 * component, keep `landmark` and `directions` text exactly as-is since
 * that's the part AWS Location Service resolves from raw GPS — see
 * "AWS Location Service: GPS to landmark directions" in the AWS
 * services table.
 */
export default function CallerMap({ call }) {
  const hasLocation = call?.location?.lat != null;

  return (
    <Card padded={false} className="overflow-hidden">
      <div className="px-4 pt-4 pb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-nkwa-600" />
        <h3 className="font-bold text-ink-900 text-sm">Caller location</h3>
      </div>

      {!hasLocation ? (
        <div className="px-4 pb-4">
          <EmptyState
            icon={MapPin}
            title="Location unresolved"
            description="GPS could not be matched to a landmark yet."
          />
        </div>
      ) : (
        <>
          {/* Placeholder map surface — replace with AWS Location Service map */}
          <div className="relative h-44 bg-nkwa-100 mx-4 rounded-xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(99,34,200,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,34,200,0.15) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-severity-critical flex items-center justify-center shadow-card-lg animate-pulse-ring" />
                <div className="w-9 h-9 rounded-full bg-severity-critical flex items-center justify-center shadow-card-lg -mt-9">
                  <MapPin
                    className="w-5 h-5 text-white"
                    fill="white"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
            <span className="absolute bottom-2 right-2 text-[10px] text-nkwa-500 bg-white/80 px-1.5 py-0.5 rounded">
              Map preview — AWS Location Service not yet connected
            </span>
          </div>

          <div className="p-4 space-y-2">
            <div>
              <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-0.5">
                Landmark
              </p>
              <p className="text-sm font-semibold text-ink-900">
                {call.location.landmark}
              </p>
            </div>
            {call.location.directions && (
              <div className="flex items-start gap-2 pt-1">
                <Navigation className="w-3.5 h-3.5 text-nkwa-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-ink-600">
                  {call.location.directions}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
