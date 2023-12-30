function Modal({ isOpen, counter, onClose, onSaveScore }) {
  return (
    <div className={isOpen ? "block" : "hidden"}>
      <div className="z-10 bg-black h-screen w-screen absolute top-0 left-0 opacity-70" />
      <div className="z-50 flex flex-col justify-center items-center bg-[#2C2C2F] w-2/6 lg:w-2/12 h-2/6 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-5">New Score</h3>
          <p>Contador: <b>{counter}</b></p>
          <p>Cantidad de puntos: <b>{counter * 2}</b></p>
        </div>
        <div className="flex gap-3">
          <button
            className="border p-2 rounded-lg hover:bg-[#38383d]"
            onClick={onSaveScore}
          >
            Save score
          </button>
          <button
            className="border p-2 rounded-lg hover:bg-[#38383d]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal