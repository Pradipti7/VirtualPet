import CatPet from "./pet/CatPet"
import DogPet from "./pet/DogPet"
import BunnyPet from "./pet/BunnyPet"
import BirdPet from "./pet/BirdPet"
import HamsterPet from "./pet/HamsterPet"

const PET_COMPONENTS = {
  cat: CatPet,
  dog: DogPet,
  bunny: BunnyPet,
  bird: BirdPet,
  hamster: HamsterPet,
}

function PetAvatar({ type, className }) {
  const Component = PET_COMPONENTS[type]
  if (!Component) return null
  return <Component className={className} />
}

export default PetAvatar
