import Image from 'next/image'
import { useState } from 'react'
import { BsGenderFemale, BsGenderMale, BsGenderTrans } from 'react-icons/bs'
import { FcEditImage } from 'react-icons/fc'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useDeleteProfilePhoto } from '@/hooks/useDeleteProfilePhoto'
import { useUpdateUser } from '@/hooks/useUpdateUser'

import PhotoModal from '@/components/profile/PhotoModal'
import PhotoUpload from '@/components/profile/PhotoUpload'
import Modal from '@/components/ui/Modal'

const EditProfile = () => {
  const [showMainModal, setShowMainModal] = useState(false)
  const [showUploadModal, setshowUploadModal] = useState(false)
  const { user, status } = useCurrentUser()
  const updateUserMutation = useUpdateUser()
  const deleteProfilePhotoMutation = useDeleteProfilePhoto()

  const deleteProfilePhotoHandler = () => {
    deleteProfilePhotoMutation.mutate(user?.name as string)
    setShowMainModal(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { name, username, gender, bio } = event.currentTarget.elements as any
    updateUserMutation.mutate({
      name: name.value,
      username: username.value,
      gender: gender.value,
      bio: bio.value,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='mt-3'>
        <div className='flex justify-center'>
          <button
            className='relative h-24 w-24'
            onClick={() => setShowMainModal(true)}
            type='button'
          >
            {status === 'success' && user?.image && (
              <Image
                src={user?.image as string}
                alt='avatar'
                layout='fill'
                className='rounded-full shadow'
              />
            )}

            <span className='absolute right-0 bottom-0'>
              <FcEditImage size={30} />
            </span>
          </button>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='name' className='flex'>
            Name
          </label>
          <input
            id='name'
            className='input-field flex'
            type='text'
            placeholder='Name'
            defaultValue={user?.name?.toString()}
            maxLength={20}
            autoComplete='off'
            required
          />
        </div>
        <div className='mt-2 flex flex-col'>
          <label htmlFor='username' className='flex'>
            Username
          </label>
          <input
            id='username'
            className='input-field flex'
            type='text'
            placeholder='Username'
            defaultValue={user?.username?.toString()}
            maxLength={20}
            autoComplete='off'
            required
          />
        </div>
        <div className='mt-2 flex flex-col'>
          <label htmlFor='bio' className='flex flex-1'>
            Bio
          </label>
          <textarea
            id='bio'
            className='input-field flex resize-none'
            placeholder='Write something about yourself'
            rows={3}
            maxLength={200}
            defaultValue={user?.bio?.toString()}
          />
        </div>
        <div className='mt-2 flex flex-col text-sm'>
          <label htmlFor='bio' className='flex flex-1'>
            Gender
          </label>
          <ul className='inline-flex space-x-1'>
            <li>
              <input
                type='radio'
                value='MALE'
                name='gender'
                className='peer appearance-none'
                id='male'
                defaultChecked={user?.gender === 'MALE'}
              />
              <label
                htmlFor='male'
                className='flex cursor-pointer items-center rounded-l bg-gray-100 py-2 px-4 font-semibold text-gray-800  peer-checked:bg-pink-500 peer-checked:text-white '
              >
                <BsGenderMale />
                <span className='ml-2'>Male</span>
              </label>
            </li>
            <li>
              <input
                type='radio'
                value='FEMALE'
                name='gender'
                className='peer appearance-none'
                id='female'
                defaultChecked={user?.gender === 'FEMALE'}
              />
              <label
                htmlFor='female'
                className='flex cursor-pointer items-center rounded-none bg-gray-100 py-2 px-4 font-semibold text-gray-800  peer-checked:bg-pink-500 peer-checked:text-white '
              >
                <BsGenderFemale />
                <span className='ml-2'>Female</span>
              </label>
            </li>
            <li>
              <input
                type='radio'
                value='OTHER'
                name='gender'
                className='peer appearance-none'
                id='other'
                defaultChecked={user?.gender === 'OTHER'}
              />
              <label
                htmlFor='other'
                className='flex cursor-pointer items-center rounded-r bg-gray-100 py-2 px-4 font-semibold text-gray-800  peer-checked:bg-pink-500 peer-checked:text-white '
              >
                <BsGenderTrans />
                <span className='ml-2'>Other</span>
              </label>
            </li>
          </ul>
        </div>
        <div className='flex justify-end'>
          <button type='submit' className='btn mt-5'>
            Save
          </button>
        </div>
      </form>
      <PhotoModal
        showMainModal={showMainModal}
        setShowMainModal={setShowMainModal}
        setshowUploadModal={setshowUploadModal}
        deleteProfilePhotoHandler={deleteProfilePhotoHandler}
      />
      <Modal showModal={showUploadModal} setShowModal={setshowUploadModal}>
        <PhotoUpload setshowUploadModal={setshowUploadModal} />
      </Modal>
    </>
  )
}

export default EditProfile
