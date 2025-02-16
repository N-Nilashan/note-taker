/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
   	extend: {
   		colors: {
   			primary: '#1A3D23',
				foreground: '#4CAF50',
   			secondary: '#EDEDED',
				backgroundLight: '#F9FAFB', // Light background
        bgDark: '#121212',  // Dark background
				dbtn: '#388E3C', // Darker green for dark mode buttons
   		},
   		borderRadius: {
   			lg: 'var(--radius)',
   			md: 'calc(var(--radius) - 2px)',
   			sm: 'calc(var(--radius) - 4px)'
   		}
   	}
  },
  plugins: [require("tailwindcss-animate")],
};
