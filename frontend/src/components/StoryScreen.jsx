function StoryScreen({ text, onNext }) {
  return (
    <div className="fade-in w-full max-w-lg">
      <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8">
        <p className="text-gray-700 text-lg leading-relaxed text-center mb-8">{text}</p>
        <div className="flex justify-center">
          <button
            onClick={onNext}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}

export default StoryScreen
