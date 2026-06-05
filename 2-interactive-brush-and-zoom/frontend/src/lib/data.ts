/**
 * Static dataset for the Interactive Brush & Zoom lesson.
 * 24 deterministic daily data points — no randomness, no Date.now().
 */
export interface DayPoint {
  /** Short label shown on the X axis (e.g. "Day 1"). */
  label: string
  /** Primary metric value (e.g. daily active users). */
  value: number
  /** Secondary metric value (e.g. daily signups). */
  signups: number
}

/** 24 static daily data points. Values are hand-crafted to be visually varied. */
export const DAY_DATA: DayPoint[] = [
  { label: "D1",  value: 120, signups: 14 },
  { label: "D2",  value: 95,  signups: 9  },
  { label: "D3",  value: 140, signups: 18 },
  { label: "D4",  value: 160, signups: 22 },
  { label: "D5",  value: 130, signups: 15 },
  { label: "D6",  value: 175, signups: 27 },
  { label: "D7",  value: 200, signups: 31 },
  { label: "D8",  value: 185, signups: 28 },
  { label: "D9",  value: 210, signups: 35 },
  { label: "D10", value: 195, signups: 30 },
  { label: "D11", value: 230, signups: 40 },
  { label: "D12", value: 215, signups: 37 },
  { label: "D13", value: 250, signups: 45 },
  { label: "D14", value: 270, signups: 50 },
  { label: "D15", value: 245, signups: 43 },
  { label: "D16", value: 260, signups: 48 },
  { label: "D17", value: 280, signups: 53 },
  { label: "D18", value: 265, signups: 49 },
  { label: "D19", value: 300, signups: 58 },
  { label: "D20", value: 285, signups: 55 },
  { label: "D21", value: 310, signups: 62 },
  { label: "D22", value: 295, signups: 57 },
  { label: "D23", value: 320, signups: 65 },
  { label: "D24", value: 340, signups: 70 },
]
