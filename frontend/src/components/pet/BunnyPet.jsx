import PetStyles from "./PetStyles"
import { PixelLayer, AnimatedLayer } from "./PixelLayer"
import { BUNNY } from "../../data/petShapes"

export default function BunnyPet({ className }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <PetStyles />
      <g className="pet-bob">
        <AnimatedLayer shapes={BUNNY.pawFL} originX={44} originY={84} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={BUNNY.pawBR} originX={83} originY={84} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={BUNNY.pawFR} originX={57} originY={85} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={BUNNY.pawBL} originX={70} originY={85} animationClass="pet-walk-paw-b" />
        <PixelLayer shapes={BUNNY.base} />
        <AnimatedLayer shapes={BUNNY.earL} originX={26} originY={43} animationClass="pet-ear-twitch-l" />
        <AnimatedLayer shapes={BUNNY.earR} originX={44} originY={41} animationClass="pet-ear-twitch-r" />
        <AnimatedLayer shapes={BUNNY.eyelidL} originX={28} originY={48} animationClass="pet-blink-l" />
        <AnimatedLayer shapes={BUNNY.eyelidR} originX={43} originY={46} animationClass="pet-blink-r" />
      </g>
    </svg>
  )
}
