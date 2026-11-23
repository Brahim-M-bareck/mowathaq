/** @type {import('tailwindcss').Config} */
module.exports = {
  // Le balisage source est analysé par le CLI Tailwind v3.
  content: ['./src/index.html'],
  theme: {
    extend: {
      // Charte stricte : bleu nuit, sable et leurs nuances uniquement.
      colors: {
        night: {
          DEFAULT: '#002147',
          deep: '#00162f',
          soft: '#0a3b6e'
        },
        sand: {
          DEFAULT: '#d2b48c',
          light: '#e6cfae',
          deep: '#b9966c'
        }
      },
      fontFamily: {
        display: ['Transcity', 'Alice', 'serif'],
        body: ['Alice', 'Georgia', 'serif'],
        arabic: ['Aref Ruqaa', 'serif']
      },
      // Tailles fluides : lisibles en salle à 1920 px, compactes à 390 px.
      fontSize: {
        'fluid-label': ['clamp(12px, 1vw, 18px)', { lineHeight: '1.3' }],
        'fluid-small': ['clamp(13px, 1.1vw, 20px)', { lineHeight: '1.4' }],
        'fluid-card': ['clamp(15px, 1.3vw, 24px)', { lineHeight: '1.5' }],
        'fluid-card-title': ['clamp(20px, 1.7vw, 32px)', { lineHeight: '1.2' }],
        'fluid-lead': ['clamp(16px, 1.4vw, 27px)', { lineHeight: '1.45' }],
        'fluid-tag': ['clamp(16px, 1.7vw, 32px)', { lineHeight: '1.3' }],
        'fluid-display': ['clamp(30px, 4vw, 72px)', { lineHeight: '1.04', letterSpacing: '0.01em' }],
        'fluid-hero': ['clamp(44px, 9vw, 168px)', { lineHeight: '1', letterSpacing: '0.04em' }],
        'fluid-verse': ['clamp(26px, 3.4vw, 62px)', { lineHeight: '2.1' }],
        'fluid-thanks': ['clamp(30px, 5vw, 90px)', { lineHeight: '1.05' }],
        'fluid-phone': ['clamp(12px, 0.85vw, 15px)', { lineHeight: '1.3' }]
      },
      spacing: {
        'fluid-xs': 'clamp(4px, 0.5vh, 10px)',
        'fluid-sm': 'clamp(8px, 1vh, 16px)',
        'fluid-md': 'clamp(12px, 1.6vh, 26px)',
        'fluid-lg': 'clamp(18px, 2.5vh, 40px)',
        'fluid-pad-x': 'clamp(20px, 4vw, 90px)',
        'fluid-pad-y': 'clamp(20px, 3vh, 54px)'
      }
    }
  },
  plugins: []
};
