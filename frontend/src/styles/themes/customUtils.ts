const SPACING_NUMERIC = 8;

export const CUSTOM_UTILS = {
  spacingNumber: (factor: number): number => {
    return factor * SPACING_NUMERIC;
  },
} as const;
