import Sidebar from "@/components/layout/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";

export default function Home() {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <ChatWindow />
    </main>
  );
}