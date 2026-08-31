import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 부터 Image 의 quality 는 여기 선언된 값만 허용된다.
    // ProjectScreenshot 에서 90 · 95 를 쓰고 있어 함께 등록한다.
    qualities: [75, 90, 95],
  },
};

export default nextConfig;
