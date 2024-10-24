/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents, addUtilities }) {
      // Custom Components (like reusable button and form classes)
      addComponents({
        ".input-field": {
          "@apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500":
            {},
        },
        ".btn-primary": {
          "@apply bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600":
            {},
        },
      });

      // Custom Utilities (for example, margins or spacing tweaks)
      addUtilities({
        ".custom-margin": {
          margin: "10px 0",
        },
      });
    },
  ],
};
