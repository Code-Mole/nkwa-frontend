import { useState } from "react";
import { Radio, ShieldAlert, PhoneOff } from "lucide-react";
import DashboardShell from "../components/dashboard/DashboardShell";
import LiveCallFeed from "../components/dashboard/LiveCallFeed";
import PrankQueue from "../components/dashboard/PrankQueue";
import CallDetailHeader from "../components/dashboard/CallDetailHeader";
import DispatcherBrief from "../components/dashboard/DispatcherBrief";
import CallerMap from "../components/dashboard/CallerMap";
import FirstAidPanel from "../components/dashboard/FirstAidPanel";
import CallTimeline from "../components/dashboard/CallTimeLine";
import CriticalCallToast from "../components/dashboard/CriticalCallToast";
import EmptyState from "../components/shared/EmptyState";
import { DashboardProvider, useDashboard } from "../context/DashboardContext";
import { useSimulatedWebSocket } from "../hooks/useSimulatedWebSocket";

/**
 * Dashboard — the dispatcher dashboard. Per the role doc: "The first
 * thing judges see is the dashboard. Make sure it loads fast, the
 * severity colours are obvious, and the brief populates visibly during
 * the demo."
 *
 * Layout: left column toggles between the live call feed and the prank
 * queue; center column shows the selected call's brief, map, and
 * first-aid panel; right column shows the call timeline.
 *
 * Wrapped in DashboardProvider here (rather than at the App root) so
 * the caller app's state stays completely independent.
 */
export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardInner />
    </DashboardProvider>
  );
}

function DashboardInner() {
  const { selectedCall } = useDashboard();
  const [leftTab, setLeftTab] = useState("live"); // 'live' | 'prank'

  // BACKEND TODO: remove this call once a real WebSocket feed is wired
  // up in DashboardContext — see useSimulatedWebSocket.js for details.
  useSimulatedWebSocket(true, 30000);

  return (
    <DashboardShell>
      <CriticalCallToast />
      <div className="h-screen flex">
        {/* Left column — live feed / prank queue */}
        <div className="w-80 flex-shrink-0 border-r border-nkwa-100 flex flex-col bg-white">
          <div className="px-4 pt-4 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-service-ambulance animate-pulse-ring" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-service-ambulance" />
            </span>
            <span className="text-[11px] font-medium text-ink-400">
              Live feed simulated — backend not yet connected
            </span>
          </div>
          <div className="flex border-b border-nkwa-100 mt-3">
            <TabButton
              icon={Radio}
              label="Live calls"
              active={leftTab === "live"}
              onClick={() => setLeftTab("live")}
            />
            <TabButton
              icon={ShieldAlert}
              label="Prank queue"
              active={leftTab === "prank"}
              onClick={() => setLeftTab("prank")}
            />
          </div>
          <div className="flex-1 min-h-0">
            {leftTab === "live" ? <LiveCallFeed /> : <PrankQueue />}
          </div>
        </div>

        {/* Center column — selected call detail */}
        <div className="flex-1 min-w-0 overflow-y-auto p-6">
          {!selectedCall ? (
            <div className="h-full flex items-center justify-center">
              <EmptyState
                icon={PhoneOff}
                title="No call selected"
                description="Choose a call from the live feed or prank queue to see its details."
              />
            </div>
          ) : (
            <>
              <CallDetailHeader call={selectedCall} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="space-y-5">
                  <DispatcherBrief call={selectedCall} />
                  <FirstAidPanel call={selectedCall} />
                </div>
                <div>
                  <CallerMap call={selectedCall} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right column — timeline */}
        {selectedCall && (
          <div className="w-80 flex-shrink-0 border-l border-nkwa-100 overflow-y-auto p-5 bg-white">
            <CallTimeline call={selectedCall} />
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

function TabButton({ icon: Icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold border-b-2 transition-colors",
        active
          ? "border-nkwa-500 text-nkwa-600"
          : "border-transparent text-ink-400 hover:text-ink-600",
      ].join(" ")}
    >
      <Icon className="w-4 h-4" strokeWidth={2.25} />
      {label}
    </button>
  );
}
