export function getFluid(basePx: string | number, minPx?: number, maxPx?: number, scaleFactor: number = 0.125): string {
    const base = typeof basePx === 'string' ? parseInt(basePx.replace('px', '')) : basePx;
    const min = minPx ?? Math.max(base, 0); // Minimum defaults to base PX or 0
    let max = maxPx ?? base * 4; // Maximum defaults to 4x base

    if (base <= 20) max = Math.min(max, 96); // Size/Spacing
    else if (base <= 12) max = Math.min(max, 48); // Gap/Margin
    else max = Math.min(max, 32); // Radius
    return `clamp(${min}px, ${base * scaleFactor}vw, ${max}px)`; // Scales linearly from mobile (360px) to desktop (1440px)
  }
