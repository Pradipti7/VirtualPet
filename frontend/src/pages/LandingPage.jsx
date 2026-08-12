function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen field-bg flex items-center justify-center p-4">
      <div className="text-center fade-in">
        <h1 className="text-5xl font-bold text-white mb-4">🐾 Virtual Pet 🐾</h1>
        <p className="text-white/90 text-lg mb-8 max-w-md">
          Adopt a cute virtual companion and take care of it!
        </p>
        <button
          onClick={onStart}
          className="bg-white text-emerald-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Start Adventure
        </button>
      </div>
    </div>
  )
}

export default LandingPage
