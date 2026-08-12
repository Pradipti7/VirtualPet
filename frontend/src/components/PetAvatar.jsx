function CatPet({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      {/* Tail */}
      <path d="M145,145 Q175,130 170,100 Q168,88 160,85" fill="none" stroke="#F4A460" strokeWidth="8" strokeLinecap="round">
        <animate attributeName="d" values="M145,145 Q175,130 170,100 Q168,88 160,85;M145,145 Q180,125 172,95 Q170,82 162,80;M145,145 Q175,130 170,100 Q168,88 160,85" dur="2.5s" repeatCount="indefinite"/>
      </path>
      {/* Body */}
      <ellipse cx="100" cy="140" rx="45" ry="35" fill="#F4A460"/>
      {/* Belly */}
      <ellipse cx="100" cy="145" rx="28" ry="22" fill="#FFDEAD"/>
      {/* Front paws */}
      <ellipse cx="78" cy="168" rx="12" ry="8" fill="#F4A460"/>
      <ellipse cx="122" cy="168" rx="12" ry="8" fill="#F4A460"/>
      {/* Paw pads */}
      <circle cx="78" cy="170" r="3" fill="#FFB6C1"/>
      <circle cx="122" cy="170" r="3" fill="#FFB6C1"/>
      {/* Head */}
      <circle cx="100" cy="80" r="38" fill="#F4A460"/>
      {/* Ears */}
      <polygon points="68,58 62,22 85,50" fill="#F4A460"/>
      <polygon points="132,58 138,22 115,50" fill="#F4A460"/>
      {/* Inner ears */}
      <polygon points="70,55 66,30 82,50" fill="#FFB6C1"/>
      <polygon points="130,55 134,30 118,50" fill="#FFB6C1"/>
      {/* Face markings */}
      <path d="M75,70 Q100,60 125,70" fill="none" stroke="#D2691E" strokeWidth="1" opacity="0.3"/>
      {/* Eyes */}
      <ellipse cx="85" cy="78" rx="9" ry="10" fill="white"/>
      <ellipse cx="115" cy="78" rx="9" ry="10" fill="white"/>
      <ellipse cx="86" cy="79" rx="5" ry="6" fill="#4A7C59"/>
      <ellipse cx="116" cy="79" rx="5" ry="6" fill="#4A7C59"/>
      <ellipse cx="86" cy="79" rx="3" ry="5" fill="#1a1a1a"/>
      <ellipse cx="116" cy="79" rx="3" ry="5" fill="#1a1a1a"/>
      <circle cx="88" cy="76" r="2" fill="white"/>
      <circle cx="118" cy="76" r="2" fill="white"/>
      {/* Nose */}
      <path d="M97,90 L100,94 L103,90 Z" fill="#FF69B4"/>
      {/* Mouth */}
      <path d="M100,94 Q96,100 93,97" fill="none" stroke="#D2691E" strokeWidth="1.2"/>
      <path d="M100,94 Q104,100 107,97" fill="none" stroke="#D2691E" strokeWidth="1.2"/>
      {/* Whiskers */}
      <line x1="55" y1="88" x2="78" y2="90" stroke="#D2691E" strokeWidth="0.8" opacity="0.6"/>
      <line x1="55" y1="93" x2="78" y2="93" stroke="#D2691E" strokeWidth="0.8" opacity="0.6"/>
      <line x1="55" y1="98" x2="78" y2="96" stroke="#D2691E" strokeWidth="0.8" opacity="0.6"/>
      <line x1="145" y1="88" x2="122" y2="90" stroke="#D2691E" strokeWidth="0.8" opacity="0.6"/>
      <line x1="145" y1="93" x2="122" y2="93" stroke="#D2691E" strokeWidth="0.8" opacity="0.6"/>
      <line x1="145" y1="98" x2="122" y2="96" stroke="#D2691E" strokeWidth="0.8" opacity="0.6"/>
      {/* Cheeks */}
      <circle cx="75" cy="92" r="6" fill="#FFB6C1" opacity="0.4"/>
      <circle cx="125" cy="92" r="6" fill="#FFB6C1" opacity="0.4"/>
    </svg>
  )
}

function DogPet({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      {/* Tail */}
      <path d="M148,135 Q170,120 165,95" fill="none" stroke="#DEB887" strokeWidth="10" strokeLinecap="round">
        <animate attributeName="d" values="M148,135 Q170,120 165,95;M148,135 Q175,115 170,90;M148,135 Q170,120 165,95" dur="0.5s" repeatCount="indefinite"/>
      </path>
      {/* Body */}
      <ellipse cx="100" cy="140" rx="45" ry="35" fill="#DEB887"/>
      {/* Belly */}
      <ellipse cx="100" cy="148" rx="30" ry="22" fill="#FAEBD7"/>
      {/* Front paws */}
      <ellipse cx="78" cy="168" rx="13" ry="8" fill="#DEB887"/>
      <ellipse cx="122" cy="168" rx="13" ry="8" fill="#DEB887"/>
      {/* Paw pads */}
      <circle cx="78" cy="170" r="3" fill="#D2691E"/>
      <circle cx="122" cy="170" r="3" fill="#D2691E"/>
      {/* Head */}
      <circle cx="100" cy="80" r="40" fill="#DEB887"/>
      {/* Ears */}
      <ellipse cx="60" cy="65" rx="16" ry="32" fill="#8B4513" transform="rotate(-20 60 65)">
        <animateTransform attributeName="transform" type="rotate" values="-20 60 65;-15 60 65;-20 60 65" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="140" cy="65" rx="16" ry="32" fill="#8B4513" transform="rotate(20 140 65)">
        <animateTransform attributeName="transform" type="rotate" values="20 140 65;15 140 65;20 140 65" dur="2.2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Face patch */}
      <circle cx="100" cy="85" r="22" fill="#F5DEB3"/>
      {/* Eyes */}
      <circle cx="85" cy="76" r="7" fill="white"/>
      <circle cx="115" cy="76" r="7" fill="white"/>
      <circle cx="86" cy="77" r="4.5" fill="#4A2F1B"/>
      <circle cx="116" cy="77" r="4.5" fill="#4A2F1B"/>
      <circle cx="88" cy="74" r="1.8" fill="white"/>
      <circle cx="118" cy="74" r="1.8" fill="white"/>
      {/* Snout */}
      <ellipse cx="100" cy="93" rx="16" ry="12" fill="#F5DEB3"/>
      {/* Nose */}
      <ellipse cx="100" cy="89" rx="7" ry="5" fill="#2C1810"/>
      <ellipse cx="100" cy="88" rx="2" ry="1" fill="#555" opacity="0.4"/>
      {/* Mouth */}
      <path d="M100,94 Q95,102 90,98" fill="none" stroke="#8B4513" strokeWidth="1.5"/>
      <path d="M100,94 Q105,102 110,98" fill="none" stroke="#8B4513" strokeWidth="1.5"/>
      {/* Tongue */}
      <ellipse cx="100" cy="102" rx="6" ry="8" fill="#FF69B4">
        <animate attributeName="ry" values="8;9;8" dur="1.5s" repeatCount="indefinite"/>
      </ellipse>
      {/* Cheeks */}
      <circle cx="75" cy="90" r="5" fill="#FFB6C1" opacity="0.4"/>
      <circle cx="125" cy="90" r="5" fill="#FFB6C1" opacity="0.4"/>
    </svg>
  )
}

function BunnyPet({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      {/* Tail */}
      <circle cx="145" cy="148" r="12" fill="white" stroke="#E8D5C0" strokeWidth="1">
        <animate attributeName="r" values="12;13;12" dur="2s" repeatCount="indefinite"/>
      </circle>
      {/* Body */}
      <ellipse cx="100" cy="140" rx="40" ry="35" fill="#F5F5DC"/>
      {/* Belly */}
      <ellipse cx="100" cy="145" rx="26" ry="22" fill="white"/>
      {/* Front paws */}
      <ellipse cx="78" cy="168" rx="12" ry="7" fill="#F5F5DC"/>
      <ellipse cx="122" cy="168" rx="12" ry="7" fill="#F5F5DC"/>
      {/* Head */}
      <circle cx="100" cy="82" r="36" fill="#F5F5DC"/>
      {/* Ears */}
      <ellipse cx="80" cy="35" rx="12" ry="38" fill="#F5F5DC" stroke="#E8D5C0" strokeWidth="1">
        <animateTransform attributeName="transform" type="rotate" values="-8 80 70;8 80 70;-8 80 70" dur="3s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="120" cy="35" rx="12" ry="38" fill="#F5F5DC" stroke="#E8D5C0" strokeWidth="1">
        <animateTransform attributeName="transform" type="rotate" values="8 120 70;-8 120 70;8 120 70" dur="3.2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Inner ears */}
      <ellipse cx="80" cy="35" rx="7" ry="28" fill="#FFB6C1"/>
      <ellipse cx="120" cy="35" rx="7" ry="28" fill="#FFB6C1"/>
      {/* Eyes */}
      <circle cx="87" cy="78" r="7" fill="#1a1a1a"/>
      <circle cx="113" cy="78" r="7" fill="#1a1a1a"/>
      <circle cx="89" cy="76" r="2.5" fill="white"/>
      <circle cx="115" cy="76" r="2.5" fill="white"/>
      {/* Nose */}
      <ellipse cx="100" cy="90" rx="4" ry="3" fill="#FF69B4"/>
      {/* Mouth */}
      <path d="M100,93 L96,98" fill="none" stroke="#D2B48C" strokeWidth="1.2"/>
      <path d="M100,93 L104,98" fill="none" stroke="#D2B48C" strokeWidth="1.2"/>
      {/* Cheeks */}
      <circle cx="76" cy="88" r="7" fill="#FFB6C1" opacity="0.4"/>
      <circle cx="124" cy="88" r="7" fill="#FFB6C1" opacity="0.4"/>
      {/* Buck teeth */}
      <rect x="96" y="95" width="4" height="5" rx="1" fill="white"/>
      <rect x="100" y="95" width="4" height="5" rx="1" fill="white"/>
    </svg>
  )
}

function BirdPet({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      {/* Tail feathers */}
      <path d="M85,155 Q65,175 55,190" fill="none" stroke="#5FA8D3" strokeWidth="5" strokeLinecap="round"/>
      <path d="M100,158 Q100,178 100,195" fill="none" stroke="#87CEEB" strokeWidth="5" strokeLinecap="round"/>
      <path d="M115,155 Q135,175 145,190" fill="none" stroke="#5FA8D3" strokeWidth="5" strokeLinecap="round"/>
      {/* Body */}
      <ellipse cx="100" cy="125" rx="35" ry="38" fill="#87CEEB"/>
      {/* Belly */}
      <ellipse cx="100" cy="132" rx="22" ry="28" fill="#E8F4FD"/>
      {/* Wings */}
      <ellipse cx="60" cy="115" rx="16" ry="30" fill="#5FA8D3" transform="rotate(-10 60 115)">
        <animateTransform attributeName="transform" type="rotate" values="-10 60 115;-18 60 115;-10 60 115" dur="1.5s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="140" cy="115" rx="16" ry="30" fill="#5FA8D3" transform="rotate(10 140 115)">
        <animateTransform attributeName="transform" type="rotate" values="10 140 115;18 140 115;10 140 115" dur="1.5s" repeatCount="indefinite"/>
      </ellipse>
      {/* Head */}
      <circle cx="100" cy="72" r="28" fill="#87CEEB">
        <animate attributeName="cy" values="72;70;72" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      {/* Eyes */}
      <circle cx="89" cy="68" r="6" fill="white"/>
      <circle cx="111" cy="68" r="6" fill="white"/>
      <circle cx="90" cy="69" r="3.5" fill="#1a1a1a"/>
      <circle cx="112" cy="69" r="3.5" fill="#1a1a1a"/>
      <circle cx="91" cy="67" r="1.2" fill="white"/>
      <circle cx="113" cy="67" r="1.2" fill="white"/>
      {/* Beak */}
      <polygon points="100,78 93,85 107,85" fill="#FFA500"/>
      <line x1="100" y1="78" x2="100" y2="85" stroke="#E89400" strokeWidth="0.8"/>
      {/* Cheeks */}
      <circle cx="80" cy="78" r="5" fill="#FFB6C1" opacity="0.5"/>
      <circle cx="120" cy="78" r="5" fill="#FFB6C1" opacity="0.5"/>
      {/* Feet */}
      <line x1="88" y1="162" x2="80" y2="180" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
      <line x1="88" y1="162" x2="90" y2="181" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
      <line x1="112" y1="162" x2="120" y2="180" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
      <line x1="112" y1="162" x2="110" y2="181" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

function HamsterPet({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      {/* Body */}
      <ellipse cx="100" cy="140" rx="42" ry="35" fill="#DEB887"/>
      {/* Belly */}
      <ellipse cx="100" cy="145" rx="28" ry="24" fill="#FAEBD7"/>
      {/* Front paws */}
      <ellipse cx="78" cy="168" rx="11" ry="6" fill="#DEB887"/>
      <ellipse cx="122" cy="168" rx="11" ry="6" fill="#DEB887"/>
      {/* Head */}
      <circle cx="100" cy="85" r="38" fill="#DEB887"/>
      {/* Ears */}
      <circle cx="65" cy="58" r="14" fill="#C4A06A"/>
      <circle cx="135" cy="58" r="14" fill="#C4A06A"/>
      <circle cx="65" cy="58" r="8" fill="#FFB6C1"/>
      <circle cx="135" cy="58" r="8" fill="#FFB6C1"/>
      {/* Cheek pouches */}
      <ellipse cx="68" cy="95" rx="18" ry="14" fill="#F5DEB3">
        <animate attributeName="rx" values="18;20;18" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="132" cy="95" rx="18" ry="14" fill="#F5DEB3">
        <animate attributeName="rx" values="18;20;18" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Face stripe */}
      <path d="M85,65 Q100,58 115,65" fill="none" stroke="#C4A06A" strokeWidth="3" opacity="0.5"/>
      {/* Eyes */}
      <circle cx="86" cy="80" r="6" fill="#1a1a1a"/>
      <circle cx="114" cy="80" r="6" fill="#1a1a1a"/>
      <circle cx="88" cy="78" r="2" fill="white"/>
      <circle cx="116" cy="78" r="2" fill="white"/>
      {/* Nose */}
      <ellipse cx="100" cy="90" rx="4" ry="3" fill="#FF69B4"/>
      {/* Mouth */}
      <path d="M100,93 Q96,98 93,95" fill="none" stroke="#8B7355" strokeWidth="1.2"/>
      <path d="M100,93 Q104,98 107,95" fill="none" stroke="#8B7355" strokeWidth="1.2"/>
      {/* Cheeks */}
      <circle cx="74" cy="92" r="6" fill="#FFB6C1" opacity="0.4"/>
      <circle cx="126" cy="92" r="6" fill="#FFB6C1" opacity="0.4"/>
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
