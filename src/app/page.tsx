// src/app/page.tsx
import Footer from "@/components/Footer";
import GraduatesListWrapper from "@/components/GraduateListWrapper";
import HeroSection from "@/components/HeroSection";
import type { Graduate } from "@/lib/api";
import { getGraduates } from "@/lib/graduates.server";

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
      className="relative min-h-screen bg-[#f7f6ee] text-black antialiased selection:bg-[#2b2670] selection:text-white"
      dir="ltr"
    >
      {/* Contained atmospheric layer — keeps blur blobs from inflating page height */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute top-[-20%] left-[-10%] h-[60vw] w-[60vw] rounded-full bg-[#c59c45]/10 blur-[130px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[50vw] w-[50vw] rounded-full bg-[#2b2670]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
        <HeroSection graduates={graduates} />

        <div className="mt-6 sm:mt-8">
          <GraduatesListWrapper graduates={graduates} error={hasError} />
        </div>

        <div className="mt-auto pt-10 sm:pt-14">
          <Footer />
        </div>
      </div>
    </main>
  );
}
