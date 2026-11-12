/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            DEFAULT: '#0A1E34', // Ultra-luxury Oxford clinical navy
            light: '#132C4A',
            dark: '#05111E',
            deep: '#030A12'
          },
          blue: {
            DEFAULT: '#1D63ED', // Refined sapphire medical blue
            50: '#F0F5FF',
            100: '#E0EBFE',
            500: '#2563EB',
            600: '#1D63ED',
            700: '#174FC4',
            800: '#123D99'
          },
          teal: {
            DEFAULT: '#0D7B73', // Sophisticated clinical eucalyptus teal
            50: '#F0FDFB',
            100: '#CCFBF4',
            600: '#0D7B73',
            700: '#095E58',
          },
          amber: {
            DEFAULT: '#D97706', // Understated clinical amber
            50: '#FFFBEB',
            100: '#FEF3C7',
            600: '#B45309',
          },
          surface: '#F8FAFC',
          card: '#FFFFFF',
          slate: {
            900: '#0F172A',
            800: '#1E293B',
            700: '#334155',
            600: '#475569',
            500: '#64748B',
            400: '#94A3B8',
            300: '#CBD5E1',
            200: '#E2E8F0',
            100: '#F1F5F9',
            50: '#F8FAFC'
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(10, 30, 52, 0.04), 0 1px 2px -1px rgba(10, 30, 52, 0.02)',
        'premium': '0 10px 25px -3px rgba(10, 30, 52, 0.06), 0 4px 6px -4px rgba(10, 30, 52, 0.03)',
        'elevated': '0 20px 30px -6px rgba(10, 30, 52, 0.08), 0 8px 10px -6px rgba(10, 30, 52, 0.04)',
      }
    },
  },
  plugins: [],
}
