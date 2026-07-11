import type { Incident, Broker } from "@/lib/types";

export const initialIncidents: Incident[] = [
  { id: "i1", severity: "HIGH", type: "PHISHING", desc: "Valorant Account @0x9f...", status: "BLOCKED", color: "orange" },
  { id: "i2", severity: "CRIT", type: "BYPASS", desc: "CS2 Account @fake_br...", status: "BLOCKED", color: "fuchsia" },
  { id: "i3", severity: "MED", type: "FRAUD", desc: "LoL Account @nullbr...", status: "REVIEWING", color: "yellow" },
  { id: "i4", severity: "LOW", type: "IMPERSONATION", desc: "Apex Account @ghost...", status: "RESOLVED", color: "cyan" },
  { id: "i5", severity: "MED", type: "OVERCHARGE", desc: "Escrow dispute @vec...", status: "RESOLVED", color: "yellow" },
  { id: "i6", severity: "HIGH", type: "PHISHING", desc: "Fortnite Account @x0...", status: "BLOCKED", color: "orange" },
];

export const initialBrokers: Broker[] = [
  { id: "b1", initials: "AX", name: "AXIOM_V", trust: "9.9", trades: "1,842", volume: "$284K", disputes: 0, since: "2021-03", verified: true },
  { id: "b2", initials: "NU", name: "NULLSHIFT", trust: "9.8", trades: "1,203", volume: "$198K", disputes: 1, since: "2020-11", verified: true },
  { id: "b3", initials: "CR", name: "CR4WLER", trust: "9.7", trades: "987", volume: "$151K", disputes: 2, since: "2022-01", verified: true },
  { id: "b4", initials: "VE", name: "VECTOR_X", trust: "9.6", trades: "764", volume: "$112K", disputes: 1, since: "2021-07", verified: true },
  { id: "b5", initials: "GH", name: "GHOST_RIG", trust: "9.5", trades: "612", volume: "$89K", disputes: 3, since: "2022-04", verified: true },
  { id: "b6", initials: "KR", name: "KRYPT0N", trust: "9.4", trades: "501", volume: "$71K", disputes: 2, since: "2023-01", verified: true },
];
