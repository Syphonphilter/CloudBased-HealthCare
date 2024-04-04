import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'app-accent': '#037668',
        'custom-pink': '#ff49db',
        'custom-green': '#13ce66',
        'app-accent-light': '#03766850',
        'dangerLight':'#ffc4c4',
        'danger': '#a11717',
        'item-dark':'#222222',
        'app-accent-blue': '#29536F',
        'app-pending':'#FFA500',
        
        'custom-gray': {
          light: '#f7fafc',
          DEFAULT: '#a0aec0',
          dark: '#4a5568',
        },
      },
    },
  },
  plugins: [],
};
export default config;
