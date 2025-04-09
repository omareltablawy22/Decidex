import { BoardCalendarTabs } from "@/components/board-calendar-tabs"; // Use correct path
import { Header } from "@/components/header"; // Use correct path

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <BoardCalendarTabs />
      </div>
    </main>
  );
}