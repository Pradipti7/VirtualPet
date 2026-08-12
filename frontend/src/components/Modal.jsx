function Modal({ children, onClose }) {
  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="modal-content bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
        {children}
      </div>
    </div>
  )
}

export default Modal
