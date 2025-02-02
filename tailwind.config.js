/** @type {import('nativewind').NativeWindConfig} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue': '#29aae2',
        'black': '#333333',
      },
      fontFamily: {
        sans: ['Oswald', 'sans-serif'],
      },
      height: {
        'screen-minus-header': 'calc(100vh - 60px)', // Adjust 60px to your header height
      },
    },
  },
  plugins: [],
};
