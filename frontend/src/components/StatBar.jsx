function StatBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className={`${color} h-3 rounded-full transition-all`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default StatBar
