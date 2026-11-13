/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        qc: {
          blue: {
            DEFAULT: '#0B5CAD',
            hover: '#094A8C',
            tint: '#E6F0FA',
          },
          red: {
            DEFAULT: '#C62828',
            tint: '#FDECEC',
          },
          surface: {
            DEFAULT: '#FFFFFF',
            page: '#F5F7FA',
          },
          text: {
            primary: '#14202E',
            secondary: '#52606F',
          },
          border: '#D5DCE4',
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"Noto Sans Tamil"', '"Noto Sans Devanagari"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '6px',
        md: '6px',
        lg: '6px',
        xl: '6px',
        '2xl': '6px',
        full: '6px',
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'xl': ['20px', '28px'],
        '2xl': ['28px', '36px'],
        '4xl': ['40px', '48px'],
      }
    },
  },
  plugins: [],
}
