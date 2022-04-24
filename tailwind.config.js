const { resolve } = require("path");
module.exports = {
  content: [
    resolve(__dirname, "./index.html"),
    resolve(__dirname, "./src/**/*.{vue,js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
