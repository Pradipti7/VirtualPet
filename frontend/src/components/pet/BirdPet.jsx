import PetStyles from "./PetStyles"
import { PixelLayer, AnimatedLayer } from "./PixelLayer"
import { BIRD } from "../../data/petShapes"

export default function BirdPet({ className }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <PetStyles />
      <g className="pet-bob">
        <AnimatedLayer shapes={BIRD.pawFL} originX={68} originY={88} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={BIRD.pawFR} originX={82} originY={88} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={BIRD.tailFeathers} originX={78} originY={80} animationClass="pet-tail-wag" />
        <PixelLayer shapes={BIRD.base} />
        <AnimatedLayer shapes={BIRD.wing} originX={58} originY={50} animationClass="pet-wing-flap" />
        <AnimatedLayer shapes={BIRD.eyelidL} originX={69} originY={29} animationClass="pet-blink-l" />
        <AnimatedLayer shapes={BIRD.eyelidR} originX={83} originY={29} animationClass="pet-blink-r" />
      </g>
    </svg>
  )
}
