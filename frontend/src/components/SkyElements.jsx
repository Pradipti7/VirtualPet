export default function SkyElements({ timeOfDay }) {
  return (
    <>
      {timeOfDay === 'morning' && (
        <div className="absolute top-8 right-12 w-16 h-16 rounded-full bg-yellow-300 shadow-[0_0_40px_15px_rgba(253,224,71,0.5)] z-0" />
      )}
      {timeOfDay === 'afternoon' && (
        <div className="absolute top-6 right-16 w-14 h-14 rounded-full bg-yellow-400 shadow-[0_0_50px_20px_rgba(255,235,59,0.4)] z-0" />
      )}
      {timeOfDay === 'evening' && (
        <>
          <div className="absolute top-10 right-20 w-12 h-12 rounded-full bg-orange-400 shadow-[0_0_30px_10px_rgba(255,152,0,0.4)] z-0" />
          <div className="absolute top-6 left-1/4 w-2 h-2 rounded-full bg-yellow-100 opacity-60 twinkle" />
          <div className="absolute top-12 left-1/3 w-1.5 h-1.5 rounded-full bg-yellow-100 opacity-50 twinkle" />
          <div className="absolute top-4 left-2/3 w-2 h-2 rounded-full bg-yellow-100 opacity-40 twinkle" />
        </>
      )}
      {timeOfDay === 'night' && (
        <>
          <div className="absolute top-8 right-16 w-10 h-10 rounded-full bg-gray-200 shadow-[0_0_20px_8px_rgba(200,200,255,0.3)] z-0" style={{ clipPath: 'circle(50% at 35% 35%)' }} />
          <div className="absolute top-6 left-1/4 w-2 h-2 rounded-full bg-white opacity-80 twinkle" />
          <div className="absolute top-14 left-1/3 w-1.5 h-1.5 rounded-full bg-white opacity-60 twinkle" />
          <div className="absolute top-4 left-2/3 w-2 h-2 rounded-full bg-white opacity-70 twinkle" />
          <div className="absolute top-20 left-1/5 w-1 h-1 rounded-full bg-white opacity-50 twinkle" />
          <div className="absolute top-8 right-1/3 w-1.5 h-1.5 rounded-full bg-white opacity-60 twinkle" />
          <div className="absolute top-24 right-1/4 w-1 h-1 rounded-full bg-white opacity-40 twinkle" />
          <div className="absolute top-2 left-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-50 twinkle" />
        </>
      )}
    </>
  )
}
