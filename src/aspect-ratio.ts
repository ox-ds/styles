import { getFluid } from './fluid'; // Import fluid scaling utility

export interface AspectRatio {
  [key: string]: string | number;
}

export const aspectRatio: AspectRatio = {

    // Base ratios
    "square": "1/1",  // Profile images, icons
    "portrait": "3/4",  // Mobile stories, vertical cards
    "landscape": "4/3",  // Product grids, blog cards
    "video": "16/9",  // Standard video embeds
    "cinema": "21/9",  // Ultra-wide hero sections
    "v-video": "9/16",  // TikTok/Reels-style content
    "dslr": "3/2",  // Photography (DSLR default)
    "v-photo": "2/3",  // Vertical photography
    "golden": "1.618/1",  // Aesthetic layouts (≈1.618:1)
    "v-golden": "1/1.618",
  
    // Social media-specific
    "ig-story": "9/16",
    "ig-portrait": "4/5",
    "fb-post": "1.91/1",  // Link previews
    "x-header": "3/1",  // Profile banners
    "lkdn-hero": "2/1",  // Company pages
  
    // Emerging formats
    "fold": "10/3",  // Dual-screen spans
    "watch": "1/1.2",  // Wearables
    "ar-card": "0.85/1",  // AR/VR tilted planes
    "3d": "1/1",  // GLTF/3D model containers
  
    // Utility ratios
    "cover": "2/1",  // Full-width headers
    "pano": "3/1",  // Scrolling galleries
    "card": "5/4",  // Dashboard widgets
    "tile": "5/3"  // E-commerce grids
  };

export function setAspectRatio(newAspectRatio: Partial<AspectRatio> = {}): void {
  Object.assign(aspectRatio, newAspectRatio);
}

export function getFluidAspectRatio(ratioKey: string, minPercent?: number, maxPercent?: number): string {
    // Type guard to ensure aspectRatios[ratioKey] is a string
    const ratio = aspectRatio[ratioKey];
    if (typeof ratio !== 'string') {
      throw new Error(`Aspect ratio for ${ratioKey} must be a string, got ${typeof ratio}`);
    }
    const [width, height] = ratio.split('/').map((v: string) => parseFloat(v.replace(/[^\d.]/g, '')));
    if (!width || !height) throw new Error(`Invalid aspect ratio: ${ratioKey}`);
    const basePercent = (height / width) * 100; // Calculate percentage for padding-top (e.g., 16/9 = 56.25%)
    const min = minPercent ?? basePercent; // Minimum defaults to base percentage
    const max = maxPercent ?? Math.min(basePercent * 1.5, 100); // Maximum defaults to 1.5x base or 100% cap
    return `clamp(${min}%, ${basePercent * 0.125}vw, ${max}%)`; // 0.125vw scales linearly from mobile (360px) to desktop (1440px)
  }