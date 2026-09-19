import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Скрываем бейдж Next.js DevTools в углу экрана
  devIndicators: false,
  // Оптимизация: не отдаём source maps в проде, React Strict Mode включён
  reactStrictMode: true,
};

export default nextConfig;
