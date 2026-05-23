// EDIT all of this with your real details.

export type StackItem = {
  category: string;
  items: string[];
};

export const stack: StackItem[] = [
  {
    category: "SIEM & XDR",
    items: ["Splunk", "Microsoft Sentinel", "Elastic", "Wazuh"],
  },
  {
    category: "Detection",
    items: ["Sigma", "KQL", "SPL", "YARA", "Suricata"],
  },
  {
    category: "Forensics & IR",
    items: ["Volatility", "Autopsy", "Velociraptor", "TheHive"],
  },
  {
    category: "Threat Intel",
    items: ["MISP", "OpenCTI", "MITRE ATT&CK", "VirusTotal"],
  },
];

export const nowFocus = {
  role: "Defensive Security Analyst",
  location: "Remote · UTC+0",
  availability: "Open to roles & collaboration",
  current: [
    "Building detection-as-code pipelines with Sigma + GitHub Actions",
    "Working through TryHackMe SOC Level 2",
    "Drafting an internal IR runbook template for small teams",
  ],
};

export type Experience = {
  role: string;
  org: string;
  status: "present" | "past";
};

// EDIT with your real (or aspirational) experience.
export const experience: Experience[] = [
  { role: "Defensive Security Analyst", org: "Independent / Open to roles", status: "present" },
  { role: "SOC Analyst (Lab)", org: "TryHackMe SOC Level 1 & 2", status: "present" },
  { role: "CTF Player", org: "TryHackMe · HTB · KC7", status: "past" },
  { role: "IT & Security Foundations", org: "Self-taught · Home lab", status: "past" },
];

export type Project = {
  name: string;
  url?: string;
  description: string;
  tags: string[];
};

// EDIT with your real projects / writeups / tools.
export const projects: Project[] = [
  {
    name: "sigma-lab",
    description:
      "Personal collection of Sigma rules for common Windows + Linux attacker behaviors, CI-tested against sample logs.",
    tags: ["sigma", "detection"],
  },
  {
    name: "ir-runbook-template",
    description:
      "Lightweight incident-response runbook template for small teams — triage, containment, eradication, and lessons-learned.",
    tags: ["ir", "process"],
  },
  {
    name: "kql-cheatsheet",
    description:
      "Living cheatsheet of KQL hunting queries for Microsoft Sentinel and Defender — sorted by ATT&CK technique.",
    tags: ["kql", "threat-hunting"],
  },
  {
    name: "homelab-detections",
    description:
      "Wazuh + Elastic home lab with custom decoders and dashboards for tracking lateral movement attempts.",
    tags: ["wazuh", "elastic", "lab"],
  },
];
