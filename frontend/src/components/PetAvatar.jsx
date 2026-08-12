function CatPet({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      {/* Ears */}
      <polygon points="55,75 70,30 90,70" fill="#F4A460" stroke="#D2691E" strokeWidth="2">
        <animateTransform attributeName="transform" type="rotate" values="0 72 70;-5 72 70;0 72 70;5 72 70;0 72 70" dur="3s" repeatCount="indefinite"/>
      </polygon>
      <polygon points="110,70 130,30 145,75" fill="#F4A460" stroke="#D2691E" strokeWidth="2">
        <animateTransform attributeName="transform" type="rotate" values="0 128 70;5 128 70;0 128 70;-5 128 70;0 128 70" dur="3.2s" repeatCount="indefinite"/>
      </polygon>
      {/* Inner ears */}
      <polygon points="63,72 73,42 87,68" fill="#FFB6C1"/>
      <polygon points="113,68 127,42 137,72" fill="#FFB6C1"/>
      {/* Head */}
      <ellipse cx="100" cy="95" rx="48" ry="42" fill="#F4A460" stroke="#D2691E" strokeWidth="2">
        <animate attributeName="ry" values="42;43;42" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Eyes */}
      <ellipse cx="82" cy="90" rx="8" ry="9" fill="white"/>
      <ellipse cx="118" cy="90" rx="8" ry="9" fill="white"/>
      <ellipse cx="83" cy="91" rx="4" ry="5" fill="#333">
        <animate attributeName="ry" values="5;1;5" dur="4s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="119" cy="91" rx="4" ry="5" fill="#333">
        <animate attributeName="ry" values="5;1;5" dur="4s" repeatCount="indefinite"/>
      </ellipse>
      {/* Nose */}
      <polygon points="100,100 96,105 104,105" fill="#FF69B4"/>
      {/* Mouth */}
      <path d="M96,107 Q100,112 104,107" fill="none" stroke="#D2691E" strokeWidth="1.5"/>
      {/* Whiskers */}
      <line x1="60" y1="98" x2="82" y2="100" stroke="#D2691E" strokeWidth="1"/>
      <line x1="60" y1="103" x2="82" y2="103" stroke="#D2691E" strokeWidth="1"/>
      <line x1="118" y1="100" x2="140" y2="98" stroke="#D2691E" strokeWidth="1"/>
      <line x1="118" y1="103" x2="140" y2="103" stroke="#D2691E" strokeWidth="1"/>
      {/* Body */}
      <ellipse cx="100" cy="145" rx="40" ry="35" fill="#F4A460" stroke="#D2691E" strokeWidth="2">
        <animate attributeName="ry" values="35;36;35" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Paws */}
      <ellipse cx="75" cy="172" rx="14" ry="8" fill="#F4A460" stroke="#D2691E" strokeWidth="1.5"/>
      <ellipse cx="125" cy="172" rx="14" ry="8" fill="#F4A460" stroke="#D2691E" strokeWidth="1.5"/>
      {/* Tail */}
      <path d="M140,140 Q170,130 165,105" fill="none" stroke="#F4A460" strokeWidth="8" strokeLinecap="round">
        <animate attributeName="d" values="M140,140 Q170,130 165,105;M140,140 Q175,125 168,100;M140,140 Q170,130 165,105" dur="2s" repeatCount="indefinite"/>
      </path>
    </svg>
  )
}

function DogPet({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      {/* Ears (floppy) */}
      <ellipse cx="60" cy="80" rx="18" ry="35" fill="#8B4513" transform="rotate(-15 60 80)">
        <animateTransform attributeName="transform" type="rotate" values="-15 60 80;-12 60 80;-15 60 80" dur="2.5s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="140" cy="80" rx="18" ry="35" fill="#8B4513" transform="rotate(15 140 80)">
        <animateTransform attributeName="transform" type="rotate" values="15 140 80;12 140 80;15 140 80" dur="2.7s" repeatCount="indefinite"/>
      </ellipse>
      {/* Head */}
      <ellipse cx="100" cy="90" rx="45" ry="40" fill="#DEB887" stroke="#8B4513" strokeWidth="2">
        <animate attributeName="ry" values="40;41;40" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Eyes */}
      <circle cx="82" cy="85" r="8" fill="white"/>
      <circle cx="118" cy="85" r="8" fill="white"/>
      <circle cx="83" cy="86" r="4.5" fill="#333"/>
      <circle cx="119" cy="86" r="4.5" fill="#333"/>
      <circle cx="85" cy="84" r="1.5" fill="white"/>
      <circle cx="121" cy="84" r="1.5" fill="white"/>
      {/* Snout */}
      <ellipse cx="100" cy="102" rx="18" ry="14" fill="#F5DEB3"/>
      {/* Nose */}
      <ellipse cx="100" cy="98" rx="7" ry="5" fill="#333">
        <animate attributeName="ry" values="5;4;5" dur="3s" repeatCount="indefinite"/>
      </ellipse>
      {/* Mouth */}
      <path d="M93,104 Q100,112 107,104" fill="none" stroke="#8B4513" strokeWidth="1.5"/>
      {/* Tongue */}
      <ellipse cx="100" cy="112" rx="5" ry="7" fill="#FF69B4">
        <animate attributeName="ry" values="7;8;7" dur="1.5s" repeatCount="indefinite"/>
      </ellipse>
      {/* Body */}
      <ellipse cx="100" cy="145" rx="42" ry="35" fill="#DEB887" stroke="#8B4513" strokeWidth="2">
        <animate attributeName="ry" values="35;36;35" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Paws */}
      <ellipse cx="72" cy="172" rx="14" ry="8" fill="#DEB887" stroke="#8B4513" strokeWidth="1.5"/>
      <ellipse cx="128" cy="172" rx="14" ry="8" fill="#DEB887" stroke="#8B4513" strokeWidth="1.5"/>
      {/* Tail */}
      <path d="M142,135 Q165,120 160,100" fill="none" stroke="#DEB887" strokeWidth="10" strokeLinecap="round">
        <animate attributeName="d" values="M142,135 Q165,120 160,100;M142,135 Q170,115 165,95;M142,135 Q165,120 160,100" dur="0.6s" repeatCount="indefinite"/>
      </path>
    </svg>
  )
}

function BunnyPet({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      {/* Ears */}
      <ellipse cx="80" cy="40" rx="12" ry="35" fill="#F5F5DC" stroke="#D2B48C" strokeWidth="1.5">
        <animateTransform attributeName="transform" type="rotate" values="-5 80 70;5 80 70;-5 80 70" dur="3s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="120" cy="40" rx="12" ry="35" fill="#F5F5DC" stroke="#D2B48C" strokeWidth="1.5">
        <animateTransform attributeName="transform" type="rotate" values="5 120 70;-5 120 70;5 120 70" dur="3.2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Inner ears */}
      <ellipse cx="80" cy="40" rx="7" ry="25" fill="#FFB6C1"/>
      <ellipse cx="120" cy="40" rx="7" ry="25" fill="#FFB6C1"/>
      {/* Head */}
      <circle cx="100" cy="90" r="38" fill="#F5F5DC" stroke="#D2B48C" strokeWidth="2">
        <animate attributeName="r" values="38;39;38" dur="2s" repeatCount="indefinite"/>
      </circle>
      {/* Eyes */}
      <circle cx="85" cy="85" r="6" fill="#333"/>
      <circle cx="115" cy="85" r="6" fill="#333"/>
      <circle cx="87" cy="83" r="2" fill="white"/>
      <circle cx="117" cy="83" r="2" fill="white"/>
      {/* Nose */}
      <ellipse cx="100" cy="98" rx="4" ry="3" fill="#FF69B4"/>
      {/* Mouth */}
      <path d="M96,101 L100,106 L104,101" fill="none" stroke="#D2B48C" strokeWidth="1.5"/>
      {/* Cheeks */}
      <circle cx="75" cy="95" r="6" fill="#FFB6C1" opacity="0.5"/>
      <circle cx="125" cy="95" r="6" fill="#FFB6C1" opacity="0.5"/>
      {/* Body */}
      <ellipse cx="100" cy="145" rx="38" ry="35" fill="#F5F5DC" stroke="#D2B48C" strokeWidth="2">
        <animate attributeName="ry" values="35;36;35" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Paws */}
      <ellipse cx="75" cy="172" rx="14" ry="8" fill="#F5F5DC" stroke="#D2B48C" strokeWidth="1.5"/>
      <ellipse cx="125" cy="172" rx="14" ry="8" fill="#F5F5DC" stroke="#D2B48C" strokeWidth="1.5"/>
      {/* Fluffy tail */}
      <circle cx="140" cy="148" r="12" fill="white" stroke="#D2B48C" strokeWidth="1">
        <animate attributeName="r" values="12;13;12" dur="1.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  )
}

function BirdPet({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      {/* Body */}
      <ellipse cx="100" cy="120" rx="35" ry="40" fill="#87CEEB" stroke="#4682B4" strokeWidth="2">
        <animate attributeName="ry" values="40;41;40" dur="1.8s" repeatCount="indefinite"/>
      </ellipse>
      {/* Belly */}
      <ellipse cx="100" cy="130" rx="22" ry="28" fill="#F0F8FF"/>
      {/* Head */}
      <circle cx="100" cy="72" r="28" fill="#87CEEB" stroke="#4682B4" strokeWidth="2">
        <animate attributeName="cy" values="72;70;72" dur="2s" repeatCount="indefinite"/>
      </circle>
      {/* Eyes */}
      <circle cx="88" cy="68" r="5" fill="white"/>
      <circle cx="112" cy="68" r="5" fill="white"/>
      <circle cx="89" cy="69" r="3" fill="#333"/>
      <circle cx="113" cy="69" r="3" fill="#333"/>
      <circle cx="90" cy="67" r="1" fill="white"/>
      <circle cx="114" cy="67" r="1" fill="white"/>
      {/* Beak */}
      <polygon points="100,78 94,85 106,85" fill="#FFA500"/>
      {/* Cheeks */}
      <circle cx="80" cy="78" r="5" fill="#FFB6C1" opacity="0.5"/>
      <circle cx="120" cy="78" r="5" fill="#FFB6C1" opacity="0.5"/>
      {/* Wings */}
      <ellipse cx="62" cy="115" rx="18" ry="28" fill="#5FA8D3" stroke="#4682B4" strokeWidth="1.5" transform="rotate(-10 62 115)">
        <animateTransform attributeName="transform" type="rotate" values="-10 62 115;-20 62 115;-10 62 115" dur="1.2s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="138" cy="115" rx="18" ry="28" fill="#5FA8D3" stroke="#4682B4" strokeWidth="1.5" transform="rotate(10 138 115)">
        <animateTransform attributeName="transform" type="rotate" values="10 138 115;20 138 115;10 138 115" dur="1.2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Feet */}
      <line x1="88" y1="158" x2="80" y2="175" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
      <line x1="88" y1="158" x2="88" y2="176" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
      <line x1="112" y1="158" x2="120" y2="175" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
      <line x1="112" y1="158" x2="112" y2="176" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
      {/* Tail feathers */}
      <path d="M90,158 Q75,175 70,185" fill="none" stroke="#5FA8D3" strokeWidth="4" strokeLinecap="round"/>
      <path d="M100,160 Q100,178 100,188" fill="none" stroke="#5FA8D3" strokeWidth="4" strokeLinecap="round"/>
      <path d="M110,158 Q125,175 130,185" fill="none" stroke="#5FA8D3" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

function HamsterPet({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      {/* Ears */}
      <circle cx="65" cy="65" r="16" fill="#D2B48C" stroke="#8B7355" strokeWidth="1.5"/>
      <circle cx="135" cy="65" r="16" fill="#D2B48C" stroke="#8B7355" strokeWidth="1.5"/>
      <circle cx="65" cy="65" r="9" fill="#FFB6C1"/>
      <circle cx="135" cy="65" r="9" fill="#FFB6C1"/>
      {/* Head */}
      <ellipse cx="100" cy="90" rx="42" ry="38" fill="#DEB887" stroke="#8B7355" strokeWidth="2">
        <animate attributeName="ry" values="38;39;38" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Cheek pouches */}
      <ellipse cx="68" cy="100" rx="16" ry="12" fill="#F5DEB3">
        <animate attributeName="rx" values="16;18;16" dur="1.5s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="132" cy="100" rx="16" ry="12" fill="#F5DEB3">
        <animate attributeName="rx" values="16;18;16" dur="1.5s" repeatCount="indefinite"/>
      </ellipse>
      {/* Eyes */}
      <circle cx="85" cy="85" r="6" fill="#333"/>
      <circle cx="115" cy="85" r="6" fill="#333"/>
      <circle cx="87" cy="83" r="2" fill="white"/>
      <circle cx="117" cy="83" r="2" fill="white"/>
      {/* Nose */}
      <ellipse cx="100" cy="96" rx="4" ry="3" fill="#FF69B4"/>
      {/* Mouth */}
      <path d="M96,99 Q100,104 104,99" fill="none" stroke="#8B7355" strokeWidth="1.5"/>
      {/* Body */}
      <ellipse cx="100" cy="145" rx="40" ry="35" fill="#DEB887" stroke="#8B7355" strokeWidth="2">
        <animate attributeName="ry" values="35;36;35" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Belly */}
      <ellipse cx="100" cy="148" rx="25" ry="24" fill="#F5DEB3"/>
      {/* Paws */}
      <ellipse cx="72" cy="172" rx="12" ry="7" fill="#DEB887" stroke="#8B7355" strokeWidth="1"/>
      <ellipse cx="128" cy="172" rx="12" ry="7" fill="#DEB887" stroke="#8B7355" strokeWidth="1"/>
      {/* Tiny tail */}
      <circle cx="100" cy="178" r="5" fill="#D2B48C"/>
    </svg>
  )
}

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
