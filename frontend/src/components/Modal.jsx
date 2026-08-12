function Modal({ children }) {
  return (
    <div className="pop-in w-full max-w-lg">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        {children}
      </div>
    </div>
  )
}

export default Modal
