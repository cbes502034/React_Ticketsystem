// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#080808",       // 背景色
          nav: "#080808",      // Navbar 色
          text: "#B19693",     // 字色
          hover: "#947A6D",    // 滑鼠 hover
        }
      }
    }
  },
  plugins: [],
}
