import type { SpacePreset } from "./types";

export const PEAK_SUN_HOURS = 5.0;
export const ELEC_ESCALATOR = 1.03;
export const PANEL_DEGRADATION = 0.995;
export const BATTERY_REPLACE_YR_SOLAR = 12;
export const BATTERY_REPLACE_PCT_SOLAR = 0.18;
export const BATTERY_REPLACE_YR_EV = 8;
export const BATTERY_REPLACE_PCT_EV = 0.5;
export const CO2_KG_PER_KWH = 0.7;
export const EV_PANEL_WATT = 670;
export const EV_SOLAR_CANOPY_UPLIFT = 1.30;
export const EV_BATTERY_RTE = 0.9;
export const EV_SOLAR_PERFORMANCE_RATIO = 0.85;
export const EV_MAINTENANCE_PCT = 0.02;

export const INSTALL_PCT_SOLAR: Record<SpacePreset, number> = {
  small: 0.2,
  medium: 0.18,
  large: 0.15,
};

export const SOLAR_SPACE_LIMITS: Record<SpacePreset, [number, number]> = {
  small: [0, 50],
  medium: [15, 200],
  large: [40, 999],
};

export const EV_SOLAR_PRESETS: Record<string, { panels: number; kwp: number }> = {
  light: { panels: 4, kwp: 2.68 },
  standard: { panels: 6, kwp: 4.02 },
  heavy: { panels: 8, kwp: 5.36 },
};

export const OUTAGE_BONUS = {
  rare: 1.0,
  occasional: 1.05,
  frequent: 1.12,
} as const;
