/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        cherry: "#CC313D",
        lightpink: "#F7C5CC"
      },
      backgroundImage: {
        'grid': "url('/assets/background.jpeg')",
      },
    },
  },
  plugins: [],
}
