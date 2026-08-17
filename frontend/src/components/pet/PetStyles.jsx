export default function PetStyles() {
  return (
    <style>{`
      @keyframes pet-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2.5px); } }
      @keyframes pet-blink { 0%, 92%, 100% { transform: scaleY(0.05); } 96% { transform: scaleY(1); } }
      @keyframes pet-tail-wag { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(10deg); } }
      @keyframes pet-tail-wag-fast { 0%,100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }
      @keyframes pet-ear-twitch { 0%,80%,100% { transform: rotate(0deg); } 90% { transform: rotate(-10deg); } }
      @keyframes pet-ear-flop { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(6deg); } }
      @keyframes pet-wing-flap { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(24deg); } }
      @keyframes pet-tongue-flick { 0%, 65%, 100% { transform: scaleY(0); } 80% { transform: scaleY(1); } }
      .pet-tongue-flick { animation: pet-tongue-flick 3.5s ease-in-out infinite; }
      @keyframes pet-tongue-pulse { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(1.15); } }
      @keyframes pet-pouch-pulse { 0%,100% { transform: scaleX(1); } 50% { transform: scaleX(1.12); } }
      @keyframes pet-walk-paw { 0%,100% { transform: translateX(0); } 50% { transform: translateX(3px); } }
      .pet-bob { animation: pet-bob 2.4s ease-in-out infinite; transform-origin: 64px 96px; }
      .pet-blink-l { animation: pet-blink 4.5s ease-in-out infinite; }
      .pet-blink-r { animation: pet-blink 4.5s ease-in-out infinite; }
      .pet-tail-wag { animation: pet-tail-wag 1.4s ease-in-out infinite; }
      .pet-tail-wag-fast { animation: pet-tail-wag-fast 0.5s ease-in-out infinite; }
      .pet-ear-twitch-l { animation: pet-ear-twitch 3.6s ease-in-out infinite; }
      .pet-ear-twitch-r { animation: pet-ear-twitch 3.6s ease-in-out infinite 0.4s; }
      .pet-ear-flop-l { animation: pet-ear-flop 0.6s ease-in-out infinite; }
      .pet-ear-flop-r { animation: pet-ear-flop 0.6s ease-in-out infinite 0.3s; }      .pet-wing-flap { animation: pet-wing-flap 0.45s ease-in-out infinite; }
      .pet-tongue-pulse { animation: pet-tongue-pulse 0.7s ease-in-out infinite; }
      .pet-pouch-pulse-l { animation: pet-pouch-pulse 1.4s ease-in-out infinite; }
      .pet-pouch-pulse-r { animation: pet-pouch-pulse 1.4s ease-in-out infinite 0.3s; }
      .pet-walk-paw-a { animation: pet-walk-paw 0.4s ease-in-out infinite; }
      .pet-walk-paw-b { animation: pet-walk-paw 0.4s ease-in-out infinite 0.2s; }
    `}</style>
  )
}
