/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: token("paper"),
        card: token("card"),
        raise: token("raise"),
        rule: token("rule"),
        dim: token("dim"),
        ink: token("ink"),
        brown: token("brown"),
        pink: token("pink"),
        "pink-deep": token("pink-deep"),
        screen: token("screen"),
        trace: token("trace"),
        grat: token("grat"),
        onpink: token("onpink"),
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        serif: ["Newsreader", "ui-serif", "Georgia", "serif"],
      },
      keyframes: {
        slide: { to: { transform: "translateX(-50%)" } },
        blink: { "50%": { opacity: "0.3" } },
      },
      animation: {
        blink: "blink 2.4s steps(1) infinite",
      },
    },
  },
  plugins: [],
};
