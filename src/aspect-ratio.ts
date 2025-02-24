export type AspectRatioKey =
  | 'square' | 'portrait' | 'landscape' | 'video' | 'cinema' | 'vVideo' | 'dslr' | 'vPhoto' | 'golden'
  | 'igStory' | 'igPortrait' | 'fbPost' | 'xHeader' | 'liHero'
  | 'fold' | 'watch' | 'arCard' | 'model'
  | 'cover' | 'pano' | 'card' | 'tile';
// If you add a new format for aspect-ratio make sure to add it to the keys in build-css!

export interface AspectRatio {
  [key: string]: string;
}

// Aspect ratios for all kinds of layouts—social, video, you name it
export const aspectRatio: Record<AspectRatioKey, string> = {
  square: "1/1",
  portrait: "3/4",
  landscape: "4/3",
  video: "16/9",
  cinema: "21/9",
  vVideo: "9/16",
  dslr: "3/2",
  vPhoto: "2/3",
  golden: "1.618/1",
  igStory: "9/16",
  igPortrait: "4/5",
  fbPost: "1.91/1",
  xHeader: "3/1",
  liHero: "2/1",
  fold: "10/3",
  watch: "1/1.2",
  arCard: "0.85/1",
  model: "1/1",
  cover: "2/1",
  pano: "3/1",
  card: "5/4",
  tile: "5/3"
};

// Updates aspect ratios at runtime if we need a custom shape
export function setAspectRatio(newAspectRatio: Partial<Record<AspectRatioKey, string>> = {}): void {
  Object.assign(aspectRatio, newAspectRatio);
}