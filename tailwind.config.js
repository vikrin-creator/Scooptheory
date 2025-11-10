/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          dark: 'var(--secondary-dark)'
        },
        text: {
          dark: 'var(--text-dark)',
          light: 'var(--text-light)'
        },
        background: {
          light: 'var(--background-light)',
          dark: 'var(--background-dark)'
        },
        // Alias for backward compatibility
        'text-dark': 'var(--text-dark)',
        'text-light': 'var(--text-light)',
        'background-light': 'var(--background-light)',
        'background-dark': 'var(--background-dark)',
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px'
      },
      boxShadow: {
        'soft': '0 4px 14px 0 rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}