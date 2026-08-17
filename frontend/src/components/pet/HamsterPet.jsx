import PetStyles from "./PetStyles"
import { PixelLayer, AnimatedLayer } from "./PixelLayer"
import { HAMSTER } from "../../data/petShapes"

export default function HamsterPet({ className }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <PetStyles />
      <g className="pet-bob">
        <AnimatedLayer shapes={HAMSTER.pawFL} originX={46} originY={86} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={HAMSTER.pawBR} originX={88} originY={86} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={HAMSTER.pawFR} originX={59} originY={87} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={HAMSTER.pawBL} originX={74} originY={87} animationClass="pet-walk-paw-b" />
        <PixelLayer shapes={HAMSTER.base} />
        <AnimatedLayer shapes={HAMSTER.pouchL} originX={21} originY={65} animationClass="pet-pouch-pulse-l" />
        <AnimatedLayer shapes={HAMSTER.pouchR} originX={53} originY={63} animationClass="pet-pouch-pulse-r" />
        <AnimatedLayer shapes={HAMSTER.eyelidL} originX={30} originY={48} animationClass="pet-blink-l" />
        <AnimatedLayer shapes={HAMSTER.eyelidR} originX={45} originY={46} animationClass="pet-blink-r" />
      </g>
    </svg>
  )
}
