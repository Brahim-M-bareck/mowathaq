/*
 * Assemblage du livrable autonome.
 * 1. Le CLI Tailwind a déjà généré src/output.css (minifié).
 * 2. On remplace les jetons de polices par des data URI base64.
 * 3. On injecte le CSS dans src/index.html et on écrit dist/index.html.
 */
const fs = require('fs');
const path = require('path');

const root = __dirname;
let sourceHtml = fs.readFileSync(path.join(root, 'src/index.html'), 'utf8');
let css = fs.readFileSync(path.join(root, 'src/output.css'), 'utf8');

const fonts = {
  __FONT_ALICE__: 'Alice/Alice-Regular.ttf',
  __FONT_TRANSITY__: 'transcity/Transcity DEMO.otf',
  __FONT_AREF_REGULAR__: 'Aref_Ruqaa/ArefRuqaa-Regular.ttf',
  __FONT_AREF_BOLD__: 'Aref_Ruqaa/ArefRuqaa-Bold.ttf'
};

for (const [token, relativePath] of Object.entries(fonts)) {
  const file = path.join(root, relativePath);
  if (!fs.existsSync(file)) throw new Error('Police introuvable : ' + relativePath);
  const mime = file.endsWith('.otf') ? 'font/otf' : 'font/ttf';
  const dataUri = 'data:' + mime + ';base64,' + fs.readFileSync(file).toString('base64');
  if (!css.includes(token)) throw new Error('Jeton CSS introuvable : ' + token);
  css = css.split(token).join(dataUri);
}

/* Icônes Lucide : on n'en dessine aucune à la main. Les SVG officiels sont
 * copiés dans src/icons/ puis inline ici, ce qui garde dist/index.html autonome. */
const iconNames = [
  'pen-line', 'link', 'shield-check', 'smartphone', 'file-text',
  'lock', 'scale', 'check-circle', 'arrow-right', 'chevron-left', 'chevron-right'
];
for (const name of iconNames) {
  const file = path.join(root, 'src/icons', name + '.svg');
  if (!fs.existsSync(file)) throw new Error('Icône Lucide introuvable : ' + name);
  let svg = fs.readFileSync(file, 'utf8');
  svg = svg.replace(/<!--[\s\S]*?-->/g, '');
  svg = svg.replace(/\s+(?:width|height)="24"/g, '');
  svg = svg.replace(/class="lucide[^"]*"/, 'class="ico lucide-' + name + '" aria-hidden="true" focusable="false"');
  svg = svg.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
  const token = '__ICON_' + name + '__';
  if (!sourceHtml.includes(token)) throw new Error('Jeton icône non utilisé : ' + token);
  sourceHtml = sourceHtml.split(token).join(svg);
}

if (!sourceHtml.includes('__INLINE_CSS__')) throw new Error('Emplacement du CSS introuvable dans src/index.html');

// Preflight génère quelques valeurs par défaut hors charte (bordures, ring,
// focus, ombres transparentes) : on les ramène toutes à night/sand.
const paletteFixes = {
  '#e5e7eb': '#d2b48c',
  '#9ca3af': 'rgba(210,180,140,.6)',
  '#fff': '#d2b48c',
  'rgba(59,130,246,.5)': 'rgba(210,180,140,.5)',
  '#0000': 'rgba(0,33,71,0)'
};
for (const [from, to] of Object.entries(paletteFixes)) css = css.split(from).join(to);

css = css.replace(/\/\*[\s\S]*?\*\//g, '');
const finalHtml = sourceHtml.replace('__INLINE_CSS__', css);

if (finalHtml.includes('__FONT_') || finalHtml.includes('__INLINE_CSS__') || finalHtml.includes('__ICON_')) {
  throw new Error('Un jeton non remplacé subsiste dans le HTML final');
}
if (/https?:\/\//.test(finalHtml.replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, ''))) {
  throw new Error('Une URL externe subsiste dans le HTML final');
}

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/index.html'), finalHtml);
console.log('dist/index.html généré (' + Buffer.byteLength(finalHtml) + ' octets, 4 polices intégrées).');
