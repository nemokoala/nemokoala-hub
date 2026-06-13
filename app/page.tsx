import { HomeView } from "@/components/HomeView";
import { resolveViewMode } from "@/lib/viewMode";

type Props = {
  searchParams: Promise<{ view?: string | string[] }>;
};

export default async function Home({ searchParams }: Props) {
  const { view } = await searchParams;
  return <HomeView mode={resolveViewMode(view)} />;
}
