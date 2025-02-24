const fs = require('fs');
const path = require('path');
const {
  size, getFluidSize,
  spacing, getFluidSpacing,
  grid, getFluidGap, getFluidMargin,
  radius, getFluidRadius,
  aspectRatio,
  shadows,
  typography, getFluidFontSize, getFluidLineHeight
} = require('../dist/index.js');

const outputDir = path.resolve(__dirname, '..');

const fontSizeLineHeightPairs = {
  xs: 'tight',
  sm: 'tight',
  md: 'normal',
  lg: 'normal',
  xl: 'loose',
  xxl: 'loose'
};

function generateCSS(tokenName, tokenValues, fluidFn) {
  const staticVars = [];
  const fluidVars = [];

  if (tokenName === 'grid') {
    // Group columns
    for (const [key, value] of Object.entries(tokenValues)) {
      staticVars.push(`--grid-col-${key}: ${value.col};`);
    }
    // Group gaps
    for (const [key, value] of Object.entries(tokenValues)) {
      staticVars.push(`--grid-col-gap-${key}: ${value.gap}px;`);
    }
    // Group margins
    for (const [key, value] of Object.entries(tokenValues)) {
      staticVars.push(`--grid-m-${key}: ${value.m}px;`);
    }
    // Group breakpoints
    for (const [key, value] of Object.entries(tokenValues)) {
      staticVars.push(`--breakpoint-${key}: ${value.breakpoint}px;`);
    }
    // Group fluid gaps
    for (const [key, value] of Object.entries(tokenValues)) {
      fluidVars.push(`--grid-col-gap-${key}-c: ${getFluidGap(value.gap)};`);
    }
    // Group fluid margins
    for (const [key, value] of Object.entries(tokenValues)) {
      fluidVars.push(`--grid-m-${key}-c: ${getFluidMargin(value.m)};`);
    }
  } else if (tokenName === 'typography') {
    staticVars.push(`--font-size-base: ${tokenValues.base}px;`);
    for (const [sizeKey, sizeValue] of Object.entries(tokenValues.fontSizes)) {
      const lineHeightKey = fontSizeLineHeightPairs[sizeKey] || 'normal';
      staticVars.push(`--font-size-${sizeKey}: ${sizeValue / tokenValues.base}rem;`);
      fluidVars.push(`--font-size-${sizeKey}-c: ${getFluidFontSize(sizeKey, lineHeightKey)};`);
    }
    for (const [heightKey, heightValue] of Object.entries(tokenValues.lineHeights)) {
      staticVars.push(`--line-height-${heightKey}: ${heightValue / tokenValues.base}rem;`);
      fluidVars.push(`--line-height-${heightKey}-c: ${getFluidLineHeight(heightKey)};`);
    }
    for (const [familyKey, familyValue] of Object.entries(tokenValues.fontFamilies)) {
      staticVars.push(`--font-family-${familyKey}: ${familyValue};`);
    }
  } else if (tokenName === 'shadow' || tokenName === 'aspect-ratio') {
    const keys = tokenName === 'aspect-ratio' ? [
      'square', 'portrait', 'landscape', 'video', 'cinema', 'vVideo', 'dslr', 'vPhoto', 'golden',
      'igStory', 'igPortrait', 'fbPost', 'xHeader', 'liHero',
      'fold', 'watch', 'arCard', 'model', 'cover', 'pano', 'card', 'tile'
    ] : Object.keys(tokenValues);
    for (const key of keys) {
      staticVars.push(`--${tokenName}-${key}: ${tokenValues[key]};`);
    }
  } else {
    for (const [key, value] of Object.entries(tokenValues)) {
      const staticValue = `${value}px`;
      staticVars.push(`--${tokenName}-${key}: ${staticValue};`);
      if (key !== 'full') {
        fluidVars.push(`--${tokenName}-${key}-c: ${fluidFn(key)};`);
      }
    }
  }

  const staticOutput = staticVars.join('\n  ');
  const fluidOutput = fluidVars.length ? fluidVars.join('\n  ') : '';
  return `:root {\n  ${staticOutput}${fluidOutput ? '\n\n  ' + fluidOutput : ''}\n}`;
}

function writeCSSFile(fileName, content) {
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Generated ${fileName}`);
}

const tokens = [
  { name: 'size', values: size, fluidFn: getFluidSize },
  { name: 'spacing', values: spacing, fluidFn: getFluidSpacing },
  { name: 'grid', values: grid, fluidFn: null },
  { name: 'radius', values: radius, fluidFn: getFluidRadius },
  { name: 'aspect-ratio', values: aspectRatio, fluidFn: null },
  { name: 'shadow', values: shadows, fluidFn: null }, // No fluid function
  { name: 'typography', values: typography, fluidFn: null }
];

tokens.forEach(({ name, values, fluidFn }) => {
  const cssContent = generateCSS(name, values, fluidFn);
  const fileName = `${name}.css`;
  writeCSSFile(fileName, cssContent);
});

console.log('All CSS files generated at root level.');