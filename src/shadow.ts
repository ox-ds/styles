export type ShadowKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'overlay' | 'inset' | 'focus';

export interface Shadows {
  [key: string]: string;
}

// Shadow options—from subtle glows to bold insets
export const shadows: Record<ShadowKey, string> = {
  xs: "0 1px 2px rgba(25, 24, 24, 0.1)",      // Barely-there shadow
  sm: "0 2px 4px rgba(25, 24, 24, 0.15)",     // Small, soft touch
  md: "0 4px 8px rgba(25, 24, 24, 0.2)",      // Medium, balanced depth
  lg: "0 8px 16px rgba(25, 24, 24, 0.25)",    // Large, noticeable drop
  xl: "0 16px 24px rgba(25, 24, 24, 0.3)",    // Extra chunky shadow
  overlay: "0 0 16px rgba(25, 24, 24, 0.5)",  // Dark overlay vibe
  inset: "inset 0 2px 4px rgba(25, 24, 24, 0.2)", // Inner shadow pop
  focus: "0 0 0 3px rgba(25, 24, 24, 0.4)"    // Focus ring glow
};

// Updates shadows at runtime if we need a custom look
export function setShadows(newShadows: Partial<Record<ShadowKey, string>> = {}): void {
  Object.assign(shadows, newShadows);
}