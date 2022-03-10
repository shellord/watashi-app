import Modal from '@/components/ui/Modal'
import React from 'react'

type Props = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const FollowsModal = ({ showModal, setShowModal }: Props) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <p>Hello</p>
    </Modal>
  )
}

export default FollowsModal
