/** @type {import('nativewind').NativeWindConfig} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue': '#29aae2',
      },
      fontFamily: {
        display: 'Oswald, ui-serif', // Adds a new `font-display` class
      },
      height: {
        'screen-minus-header': 'calc(100vh - 60px)', // Adjust 60px to your header height
      },
    },
  },
  plugins: [],
};
