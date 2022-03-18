import { useDeleteComment } from '@/hooks/useDeleteComment'

import Modal from '@/components/ui/Modal'

type Props = {
  id: string
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const DeleteCommentModal = ({ id, showModal, setShowModal }: Props) => {
  const deleteCommentMutation = useDeleteComment()
  const onDeleteCommentHandler = () => {
    deleteCommentMutation.mutate(id)
    setShowModal(false)
  }
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className='absolute top-36 w-full max-w-lg p-5'>
        <div className='bg-white rounded-lg'>
          <div className='flex justify-center items-center p-10 flex-col'>
            <p>Are you sure you want to delete this comment?</p>
            <div className='mt-5 flex space-x-2'>
              <button className='btn' onClick={onDeleteCommentHandler}>
                Delete
              </button>
              <button
                className='btn-secondary'
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteCommentModal
