import { Cross, Flame, Shield, Megaphone } from "lucide-react";

/**
 * Languages Nkwa listens for. Matches "Listens to the call in any
 * Ghanaian language (Twi, Ga, Ewe, English)" from the idea submission,
 * plus Dagbani per the frontend role doc's Khaya AI integration line.
 */
export const LANGUAGES = [
  { code: "EN", label: "English", native: "English" },
  { code: "TW", label: "Twi", native: "Twi" },
  { code: "GA", label: "Ga", native: "Ga" },
  { code: "EW", label: "Ewe", native: "Eʋegbe" },
];

/**
 * The four emergency service types, matching icon badge colours from
 * the mobile Home screen (service.* tokens in tailwind.config.js).
 */
export const SERVICES = [
  {
    id: "ambulance",
    label: "Ambulance",
    description: "Medical emergency response",
    icon: Cross,
    tone: "ambulance",
  },
  {
    id: "fire",
    label: "Fire Service",
    description: "Fire & rescue operations",
    icon: Flame,
    tone: "fire",
  },
  {
    id: "police",
    label: "Police",
    description: "Crime & security response",
    icon: Shield,
    tone: "police",
  },
  {
    id: "sos",
    label: "SOS Alert",
    description: "Instant panic & alert dispatch",
    icon: Megaphone,
    tone: "sos",
  },
];

/** Quick id -> service lookup, e.g. SERVICES_BY_ID['ambulance'] */
export const SERVICES_BY_ID = Object.fromEntries(
  SERVICES.map((s) => [s.id, s]),
);

/** Quick code -> language lookup, e.g. LANGUAGES_BY_CODE['TW'] */
export const LANGUAGES_BY_CODE = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l]),
);
