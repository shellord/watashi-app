import Modal from '@/components/ui/Modal'
import React from 'react'

type Props = {
  showMainModal: boolean
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>
  setshowUploadModal: React.Dispatch<React.SetStateAction<boolean>>
  deleteProfilePhotoHandler: () => void
}

const PhotoModal = ({
  showMainModal,
  setShowMainModal,
  setshowUploadModal,
  deleteProfilePhotoHandler,
}: Props) => {
  return (
    <Modal showModal={showMainModal} setShowModal={setShowMainModal}>
      <div className='absolute top-36  w-full max-w-xl p-5'>
        <div className='flex  flex-col rounded-lg bg-white px-10 text-center'>
          <button
            className='py-3'
            onClick={() => {
              setShowMainModal(false)
              setshowUploadModal(true)
            }}
            type='button'
          >
            Choose from gallery
          </button>
          <button
            className='border-t-[0.05rem] border-b-[0.05rem] py-3'
            type='button'
            onClick={() => deleteProfilePhotoHandler()}
          >
            Remove Profile Picture
          </button>
          <button
            className='py-3'
            onClick={() => setShowMainModal(false)}
            type='button'
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default PhotoModal
