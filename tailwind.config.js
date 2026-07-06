/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/ejs/**/*.ejs", "./assets/js/**/*.js", "./tailwind-reference.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          gold: "#a88440",
          bg: "#edeae1",
        },
        link: {
          muted: "#666666",
        },
      },
      spacing: {
        "sp-section-x": "clamp(16px, 3.738vw, 20px)",
        "sp-section-y": "clamp(40px, 9.346vw, 48px)",
        "sp-gap-md": "clamp(16px, 3.738vw, 20px)",
        "sp-gap-lg": "clamp(32px, 7.477vw, 40px)",
      },
      maxWidth: {
        content: "1140px",
      },
      scale: {
        subtle: "1.06",
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', "system-ui", "sans-serif"],
        serif: ['"Noto Serif JP"', "serif"],
        roboto: ["Roboto", "system-ui", "sans-serif"],
      },
    },
  },
};
