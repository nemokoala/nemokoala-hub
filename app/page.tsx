import { HomeView } from "@/components/HomeView";

// searchParams 를 읽지 않아야 정적 생성(SSG)된다.
export default function Home() {
  return <HomeView />;
}
