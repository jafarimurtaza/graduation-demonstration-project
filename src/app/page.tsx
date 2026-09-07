import GraduationMessages from "@/components/GraduationMessages";
import GraduatePicker from "@/components/GraduatePicker";
import MessageForm from "@/components/MessageForm";
import SuccessPanel from "@/components/SuccessPanel";
import GraduateLists from "@/components/GraduateLists";


export default function Home() {
  return(
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
  )
}