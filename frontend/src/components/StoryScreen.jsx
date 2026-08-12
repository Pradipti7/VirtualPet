import { useState } from 'react'
import TypewriterText from './TypewriterText'

function StoryScreen({ text, onNext }) {
  const [typingDone, setTypingDone] = useState(false)

  return (
    <div className="fade-in w-full max-w-2xl text-center px-6">
      <div className="mb-12">
        <p className="text-white text-2xl leading-relaxed drop-shadow-lg font-medium">
          <TypewriterText
            text={text}
            speed={30}
            onComplete={() => setTypingDone(true)}
          />
        </p>
      </div>
      {typingDone && (
        <div className="fade-in flex justify-center">
          <button
            onClick={onNext}
            className="bg-white/90 hover:bg-white text-emerald-700 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}

export default StoryScreen
