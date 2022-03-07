type Props = {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: () => void
}

const DeleteListModal = ({ setShowDeleteModal, onDelete }: Props) => {
  return (
    <div className='absolute top-36 w-full max-w-xl p-5'>
      <div className='rounded-lg bg-white p-5 text-center'>
        <span className='font-semibold'>
          Are you sure you wanna delete this list?
        </span>
        <div className='mt-5 flex justify-center space-x-3'>
          <button
            className='btn-secondary'
            onClick={() => setShowDeleteModal(false)}
          >
            <span>No</span>
          </button>
          <button className='btn' onClick={onDelete}>
            <span>Yes</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteListModal
