/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './layouts/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-rawson-pro)', 'sans-serif']
      },
      colors: {
        yellow: 'var(--yellow)',
        'yellow-50': 'var(--yellow-50)',
        'yellow-100': 'var(--yellow-100)',
        'yellow-200': 'var(--yellow-200)',
        'yellow-300': 'var(--yellow-300)',
        'yellow-400': 'var(--yellow-400)',
        'yellow-500': 'var(--yellow-500)',
        'yellow-600': 'var(--yellow-600)',
        'yellow-700': 'var(--yellow-700)',
        'yellow-800': 'var(--yellow-800)',
        'yellow-900': 'var(--yellow-900)',
        'yellow-950': 'var(--yellow-950)',
        'light-yellow': 'var(--light-yellow)',
        'yellow-foreground': 'var(--yellow-foreground)',
        black: 'var(--black)',
        gray: 'var(--gray)',
        gray2: 'var(--gray2)',
        'light-gray': 'var(--light-gray)',
        'light-gray2': 'var(--light-gray2)',
        gray3: 'var(--gray3)',
        line: 'var(--line)',
        overlay: 'hsla(var(--overlay))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        link: 'hsl(var(--link))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      mask: 'var(--mask)',
      padding: {
        lateral: '8rem',
        'lateral-md': '5rem',
        'lateral-sm': '1.5rem'
      },
      backgroundImage: {
        footer: 'url("/1920-footer.svg")'
      },
      keyframes: {
        iconShow: {
          '0%': { opacity: 0, transform: 'scale(0.6)' },
          '80%': { opacity: 0.8, transform: 'scale(1.1)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        show: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        'overlay-show': {
          from: { opacity: 0 },
          to: { opacity: 1 }
        }
      },
      animation: {
        'icon-show': 'iconShow 500ms ease-out forwards',
        show: 'show 200ms ease-out forwards',
        'overlay-show': 'overlay-show 200ms cubic-bezier(0.16, 1, 0.3, 1)'
      },
      screens: {
        th: { raw: '(max-height: 700px)' }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
