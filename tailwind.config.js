/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F9AB3E",
        secondary: "#0C2024",
        dark: "#0F2338",
        purple: "#3D2570",
      },

      height: {
        "100vh": "calc(100vh - var(--nav-height))",
        "nav-height": "var(--nav-height)",
      },
      width: {
        "100vw": "calc(100vw - var(--sidebar-width))",
      },
      minHeight: {
        "100vh": "calc(100vh - var(--nav-height))",
      },
      maxHeight: {
        "100vh": "calc(100vh - var(--nav-height))",
      },
      padding: {
        "nav-height": "var(--nav-height)",
      },
      margin: {
        "nav-height": "var(--nav-height)",
      },
    },
  },
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
