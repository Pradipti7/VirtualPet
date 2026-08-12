function ActionButton({ onClick, label, color }) {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white font-semibold py-3 px-4 rounded-xl transition-colors`}
    >
      {label}
    </button>
  )
}

export default ActionButton
