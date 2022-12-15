const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
    // defaultLineHeights: true,
    // standardFontWeights: true
  },
  purge: {
    enabled: false
  },
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif']
    },
    extend: {
      colors: {
        primary: colors.blue[600],
        secondary: colors.green[600],
        error: colors.red[600]
      },
      keyframes: {
        fadeIn: {
          '0%%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        fadeOut: {
          '0%%': { opacity: 1 },
          '100%': { opacity: 0 }
        }
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-out': 'fadeOut 1s ease-in-out'
      },
      maxHeight: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '2/3': '66%',
        '3/4': '75%',
        full: '100%'
      },
      minHeight: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%'
      },
      height: {
        '1/4': '25vh',
        '1/3': '33vh',
        '1/2': '50vh',
        '2/3': '66vh',
        '3/4': '75vh'
      },
      maxWidth: {
        1: '100px',
        2: '200px',
        3: '300px',
        '1/4': '25%',
        '1/3': '33%',
        '1/2': '50%',
        '2/3': '66%',
        '3/4': '75%'
      },
      spacing: {
        72: '18rem',
        84: '21rem'
      }
    }
  },
  variants: {},
  plugins: []
}
