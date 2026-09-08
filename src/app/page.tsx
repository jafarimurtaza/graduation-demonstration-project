import GraduateLists from "@/components/GraduateLists";
import GraduatePicker from "@/components/GraduatePicker";
import GraduationMessages from "@/components/GraduationMessages";
import MessageForm from "@/components/MessageForm";
import SuccessPanel from "@/components/SuccessPanel";

export default async function Home() {
  // const graduates = await getGraduates();

  return (
    <>
      {/* <Nav /> */}
      <main>
        <GraduatePicker />
        <MessageForm />
        <SuccessPanel />
        <GraduateLists />
        <GraduationMessages />
      </main>
      {/* <Footer/> */}
    </>
  );
}
