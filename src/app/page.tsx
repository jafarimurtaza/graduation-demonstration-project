// src/app/page.tsx
import GraduatesListWrapper from "@/components/GraduateListWrapper";
import HeroSection from "@/components/HeroSection";
import { getGraduates, Graduate } from "@/lib/api";

export default async function Home() {
  let graduates: Graduate[] = [];
  let hasError = false;

  try {
    graduates = await getGraduates();
  } catch (error) {
    console.error("Failed to stream server profiles via getGraduates:", error);
    hasError = true;
  }

  return (
    <main
      className="min-h-screen bg-[#f7f6ee] text-black p-4 sm:p-12 relative overflow-hidden antialiased selection:bg-[#2b2670] selection:text-white"
      dir="ltr"
    >
      <HeroSection graduates={graduates} />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Task 3 Ultra-Premium List View Wrapper Component */}
        <GraduatesListWrapper graduates={graduates} error={hasError} />
      </div>
    </main>
  );
}
