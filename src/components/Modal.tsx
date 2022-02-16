import React, { useRef } from 'react'

type Props = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

const Modal = ({ showModal, setShowModal, children }: Props) => {
  const modalRef = useRef(null)

  const closeModal = (e: React.MouseEvent) => {
    modalRef.current === e.target && setShowModal(false)
  }

  return (
    <div
      className={`fixed top-0 left-0  z-20 flex  h-full w-full justify-center bg-black/50  transition-all  ease-in-out  ${
        !showModal ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      onClick={closeModal}
      ref={modalRef}
    >
      {children}
    </div>
  )
}

export default Modal
