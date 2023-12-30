import Globals from "@/components/Globals"
import Scores from "@/components/Scores"
import PracticeArea from "@/components/PracticeArea";

export default function Practice() {
  return (
    <main className="flex flex-1 overflow-hidden">
      <Scores />
      <PracticeArea />
      <Globals />
    </main>
  )
}
