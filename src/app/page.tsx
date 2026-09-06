import GraduatesList from "@/components/Graduates/GraduatesList";
import { getGraduates } from "@/lib/api";

export default async function Home() {
  const graduates = await getGraduates();

  return <GraduatesList graduates={graduates} />;
}