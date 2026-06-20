import { Link } from "react-router-dom";
import {
  Eye,
  PhoneCall,
  ShieldCheck,
  Languages,
  MapPinned,
  HeartPulse,
  FileCheck2,
  ShieldAlert,
} from "lucide-react";
import Button from "../components/shared/Button";
import Card from "../components/shared/Card";

/**
 * LandingPage — the public front door at "/". Content is drawn directly
 * from the Group 10 idea submission deck (The Problem / The Solution /
 * Customer Benefit / How it works slides) so the pitch stays consistent
 * across the deck, the mobile app, and this web app.
 *
 * Two calls to action, matching the two real audiences:
 *   - "Place an emergency call" -> /call, no login, open to anyone
 *   - "Dispatcher sign in" -> /dispatcher-login, gated, staff only
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <header className="bg-nkwa-gradient relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full border border-white/15" />
      <div className="absolute -top-4 -right-4 w-44 h-44 rounded-full border border-white/15" />

      <nav className="relative z-10 max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-6 h-6 text-white" strokeWidth={2.5} />
          <span className="text-white text-xl font-bold">nkwa</span>
        </div>
        <Link
          to="/dispatcher-login"
          className="text-white/80 text-sm font-medium hover:text-white transition-colors"
        >
          Dispatcher sign in
        </Link>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-10 pb-20 text-center">
        <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight">
          A GenAI copilot for Ghana's 112 emergency line
        </h1>
        <p className="text-white/75 text-lg mt-5 max-w-xl mx-auto">
          Speak in your own language. Get first-aid guidance while you wait.
          Reach a dispatcher who already knows what's wrong and where you are.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link to="/call" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              icon={PhoneCall}
              className="!bg-white !text-nkwa-700 !border-0 hover:!brightness-95"
            >
              Place an emergency call
            </Button>
          </Link>
          <Link to="/dispatcher-login" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              size="lg"
              fullWidth
              className="!text-white border border-white/30 hover:!bg-white/10"
            >
              Dispatcher sign in
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function ProblemSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
        <div>
          <p className="text-xs font-semibold text-nkwa-600 uppercase tracking-wide mb-2">
            The problem
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-4">
            Today, callers have to explain everything themselves — in a panic,
            sometimes in a language the dispatcher doesn't speak.
          </h2>
          <ul className="space-y-2.5 text-ink-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-severity-critical mt-1.5 flex-shrink-0" />
              90% of all 112 calls are pranks, overwhelming real dispatchers
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-severity-critical mt-1.5 flex-shrink-0" />
              Average ambulance response time is 16.9 minutes against an
              8-minute target
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-severity-critical mt-1.5 flex-shrink-0" />
              Callers receive zero guidance while waiting
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-severity-critical mt-1.5 flex-shrink-0" />
              There is no street addressing system in Accra
            </li>
          </ul>
        </div>

        <Card className="w-full md:w-56 text-center flex-shrink-0">
          <p className="text-5xl font-bold text-severity-critical">90%</p>
          <p className="text-sm font-semibold text-ink-700 mt-1">
            of calls to emergency services are prank calls
          </p>
          <p className="text-xs text-ink-400 mt-2">
            Source: President Akufo-Addo, Jan 2020
          </p>
        </Card>
      </div>
    </section>
  );
}

const SOLUTION_POINTS = [
  {
    icon: Languages,
    text: "Listens in any Ghanaian language — Twi, Ga, Ewe, English",
  },
  {
    icon: ShieldAlert,
    text: "Detects and de-prioritises prank calls automatically",
  },
  {
    icon: MapPinned,
    text: "Resolves your location with landmarks, not street addresses",
  },
  {
    icon: HeartPulse,
    text: "Talks you through first aid while help is on the way",
  },
  {
    icon: FileCheck2,
    text: "Hands the dispatcher a complete brief before they pick up",
  },
];

function SolutionSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-semibold text-nkwa-600 uppercase tracking-wide mb-2 text-center">
          The solution
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 text-center max-w-2xl mx-auto">
          Nkwa sits between you and the dispatcher, doing the work panic makes
          hard
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
          {SOLUTION_POINTS.map(({ icon: Icon, text }) => (
            <Card key={text} className="text-center">
              <div className="w-11 h-11 rounded-2xl bg-nkwa-50 text-nkwa-600 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5" strokeWidth={2.25} />
              </div>
              <p className="text-sm text-ink-700 leading-snug">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: 1,
    title: "You speak",
    body: "In any Ghanaian language. No need to switch to English under pressure.",
  },
  {
    n: 2,
    title: "Nkwa listens",
    body: "Transcribes and translates in real time, under 30 seconds.",
  },
  {
    n: 3,
    title: "AI triages",
    body: "Severity, incident type, and prank check happen automatically.",
  },
  {
    n: 4,
    title: "You get guided",
    body: "First-aid instructions in your own language while help travels to you.",
  },
  {
    n: 5,
    title: "Dispatcher acts",
    body: "They receive a complete brief and start deciding, not extracting information.",
  },
];

function HowItWorksSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold text-nkwa-600 uppercase tracking-wide mb-2 text-center">
        How it works
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 text-center mb-10">
        From the first word to a dispatched unit
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {STEPS.map((step) => (
          <div key={step.n} className="relative">
            <div className="w-9 h-9 rounded-full bg-nkwa-gradient text-white font-bold flex items-center justify-center text-sm mb-3">
              {step.n}
            </div>
            <p className="font-semibold text-ink-900 text-sm mb-1">
              {step.title}
            </p>
            <p className="text-xs text-ink-500 leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CallToActionSection() {
  return (
    <section className="bg-nkwa-gradient py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <ShieldCheck
          className="w-10 h-10 text-white/80 mx-auto mb-4"
          strokeWidth={1.75}
        />
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
          Built for Ghana Fire Service, Ambulance Service, and Police
        </h2>
        <p className="text-white/70 text-sm max-w-xl mx-auto mb-8">
          Reduce time-to-dispatch and give every caller life-saving guidance in
          the minutes that matter most.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/call" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              icon={PhoneCall}
              className="!bg-white !text-nkwa-700 !border-0 hover:!brightness-95"
            >
              Place an emergency call
            </Button>
          </Link>
          <Link to="/dispatcher-login" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              size="lg"
              fullWidth
              className="!text-white border border-white/30 hover:!bg-white/10"
            >
              Dispatcher sign in
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-ink-400">
      <span>Nkwa — Group 10, AWS GenAI Hackathon 2026</span>
      <span>Demo build · not a real emergency line</span>
    </footer>
  );
}
