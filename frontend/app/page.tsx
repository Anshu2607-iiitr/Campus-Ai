export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">🎓 CampusAI</h1>

        <p className="mt-4 text-gray-400">
          Your Personal College Assistant
        </p>

        <button className="mt-8 rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </main>
  );
}