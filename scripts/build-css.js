const fs = require('fs');
const path = require('path');
const { size, spacing, grid, radius, aspectRatio, shadows, typography } = require('../dist/index.js');

const outputDir = path.resolve(__dirname, '..');

function generateCSS(tokenName, tokenValues) {
  const cssVariables = [];
  if (tokenName === 'grid') {
    
    const columns = [];
    const columnGaps = [];
    const margins = [];
    const breakpoints = [];

    for (const [key, value] of Object.entries(tokenValues)) {
      columns.push(`--grid-col-${key}: ${value.col};`);
      columnGaps.push(`--grid-col-gap-${key}: ${value.gap};`);
      margins.push(`--grid-m-${key}: ${value.m};`);
      breakpoints.push(`--breakpoint-${key}: ${value.breakpoint};`);
    }

    cssVariables.push(...columns, '', ...columnGaps, '', ...margins, '', ...breakpoints);
  } else {
    for (const [key, value] of Object.entries(tokenValues)) {
      
      if (tokenName === 'typography') {
        if (key === 'base') {
          cssVariables.push(`--font-size-${key}: ${value};`);
        } else if (key === 'fontSizes') {
          const basePx = parseInt(tokenValues.base.replace('px', '')) || 16; // Default to 16px if invalid
          for (const [sizeKey, sizeValue] of Object.entries(value)) {
            const sizePx = parseInt(sizeValue.replace('px', '')) || 12; // Default to 12px if invalid
            const sizeRem = sizePx / basePx;
            cssVariables.push(`--font-size-${sizeKey}: ${sizeRem}rem;`);
          }
        } else if (key === 'lineHeights') {
          const basePx = parseInt(tokenValues.base.replace('px', '')) || 16; // Default to 16px if invalid
          for (const [heightKey, heightValue] of Object.entries(value)) {
            const heightPx = parseFloat(heightValue.replace('px', '')) || 19.2; // Default to 19.2px (1.2 * 16px) if invalid
            const heightRem = heightPx / basePx; // Calculate REM relative to baseFontSize
            cssVariables.push(`--line-height-${heightKey}: ${heightRem}rem;`);
          }
        } else if (key === 'fontFamilies') {
          for (const [familyKey, familyValue] of Object.entries(value)) {
            cssVariables.push(`--font-family-${familyKey}: ${familyValue};`);
          }
        }
      } else {
        
        const cssValue = typeof value === 'string' ? value : (typeof value === 'number' ? value.toString() : value.px);
        cssVariables.push(`--${tokenName}-${key}: ${cssValue};`);
      }
    }
  }
  return `:root {\n${cssVariables.join('\n').trim()}\n}`;
}

function writeCSSFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

const sizeCssContent = generateCSS('size', size);
const sizeFileName = 'size.css';
const sizeFilePath = path.join(outputDir, sizeFileName);
writeCSSFile(sizeFilePath, sizeCssContent);

const spacingCssContent = generateCSS('spacing', spacing);
const spacingFileName = 'spacing.css';
const spacingFilePath = path.join(outputDir, spacingFileName);
writeCSSFile(spacingFilePath, spacingCssContent);

const gridCssContent = generateCSS('grid', grid);
const gridFileName = 'grid.css';
const gridFilePath = path.join(outputDir, gridFileName);
writeCSSFile(gridFilePath, gridCssContent);

const radiusCssContent = generateCSS('radius', radius);
const radiusFileName = 'radius.css';
const radiusFilePath = path.join(outputDir, radiusFileName);
writeCSSFile(radiusFilePath, radiusCssContent);

const aspectRatioCssContent = generateCSS('aspect-ratio', aspectRatio);
const aspectRatioFileName = 'aspect-ratio.css';
const aspectRatioFilePath = path.join(outputDir, aspectRatioFileName);
writeCSSFile(aspectRatioFilePath, aspectRatioCssContent);

const shadowCssContent = generateCSS('shadow', shadows);
const shadowFileName = 'shadow.css';
const shadowFilePath = path.join(outputDir, shadowFileName);
writeCSSFile(shadowFilePath, shadowCssContent);

const typographyCssContent = generateCSS('typography', typography);
const typographyFileName = 'typography.css';
const typographyFilePath = path.join(outputDir, typographyFileName);
writeCSSFile(typographyFilePath, typographyCssContent);

console.log('CSS files generated at root level.');