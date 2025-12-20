
import type { Config } from "tailwindcss";

const config: Config = {
  // === SỬA LỖI: THÊM ĐƯỜNG DẪN ĐẾN THƯ MỤC `src` ===
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Quét cả thư mục app và src
  ],
  theme: {
    extend: {
      colors: {
        "deep-rose": "#B76E79",
        "rose-accent": "#D4A3A3",
        "lavender-blush": "#FFF0F5",
        charcoal: "#36454F",
        white: "#FFFFFF",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
