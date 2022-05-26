import Modal from '@/components/ui/Modal'

type Props = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const MovieDetailsModal = ({ showModal, setShowModal }: Props) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className='absolute top-96 w-full max-w-lg p-5'>
        <div className='bg-primary rounded-lg'>Hello World</div>
      </div>
    </Modal>
  )
}

export default MovieDetailsModal
