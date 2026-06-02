/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1A3C6E',
          secondary: '#0066CC',
          success: '#28A745',
          warning: '#FFC107',
          danger: '#DC3545',
          background: '#F0F2F5',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 10px 30px rgba(26, 60, 110, 0.08)',
      },
    },
  },
  plugins: [],
};
