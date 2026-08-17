import PetStyles from "./PetStyles"
import { PixelLayer, AnimatedLayer } from "./PixelLayer"
import { CAT } from "../../data/petShapes"

export default function CatPet({ className }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <PetStyles />
      <g className="pet-bob">
        <AnimatedLayer shapes={CAT.pawFL} originX={45} originY={84} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={CAT.pawBR} originX={87} originY={84} animationClass="pet-walk-paw-a" />
        <AnimatedLayer shapes={CAT.pawFR} originX={58} originY={85} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={CAT.pawBL} originX={74} originY={85} animationClass="pet-walk-paw-b" />
        <AnimatedLayer shapes={CAT.tail} originX={94} originY={66} animationClass="pet-tail-wag" />
        <PixelLayer shapes={CAT.base} />
        <AnimatedLayer shapes={CAT.earL} originX={25} originY={40} animationClass="pet-ear-twitch-l" />
        <AnimatedLayer shapes={CAT.earR} originX={47} originY={38} animationClass="pet-ear-twitch-r" />
        <AnimatedLayer shapes={CAT.eyelidL} originX={29} originY={49} animationClass="pet-blink-l" />
        <AnimatedLayer shapes={CAT.eyelidR} originX={45} originY={47} animationClass="pet-blink-r" />
      </g>
    </svg>
  )
}
