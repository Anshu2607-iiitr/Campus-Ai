export default function Sidebar() {
  return (
    <aside className="w-72 bg-zinc-950 border-r border-zinc-800 text-white p-5">
      <h1 className="text-2xl font-bold">🎓 CampusAI</h1>

      <button className="mt-6 w-full rounded-lg bg-blue-600 py-2 hover:bg-blue-700 transition">
        + New Chat
      </button>

      <div className="mt-8 space-y-3">
        <p>💬 Chats</p>
        <p>📄 Notes</p>
        <p>📅 Timetable</p>
        <p>📊 Attendance</p>
        <p>🎓 CGPA</p>
        <p>⚙️ Settings</p>
      </div>
    </aside>
  );
}