import PetStyles from "./PetStyles"
import { PixelLayer, AnimatedLayer } from "./PixelLayer"
import { DOG } from "../../data/petShapes"

export default function DogPet({ className }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <PetStyles />
      <g className="pet-bob">
        <AnimatedLayer shapes={DOG.pawFL} originX={46} originY={84} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={DOG.pawBR} originX={90} originY={84} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={DOG.pawFR} originX={60} originY={85} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={DOG.pawBL} originX={76} originY={85} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={DOG.tail} originX={94} originY={64} animationClass="pet-tail-wag-fast" />
        <PixelLayer shapes={DOG.base} />
       <AnimatedLayer shapes={DOG.earR} originX={55} originY={46} animationClass="pet-ear-flop-r" />
      <AnimatedLayer shapes={DOG.earL} originX={17} originY={46} animationClass="pet-ear-flop-l" />
        <AnimatedLayer shapes={DOG.tongue} originX={29} originY={68} animationClass="pet-tongue-pulse" />
        <AnimatedLayer shapes={DOG.eyelidL} originX={30} originY={52} animationClass="pet-blink-l" />
        <AnimatedLayer shapes={DOG.eyelidR} originX={45} originY={50} animationClass="pet-blink-r" />
      </g>
    </svg>
  )
}
