import { User } from '@prisma/client'
import { useRouter } from 'next/router'
import React from 'react'
import { IoMdClose } from 'react-icons/io'

import Modal from '@/components/ui/Modal'

type Props = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  users: User[]
  title: string
}

const FollowsModal = ({ showModal, setShowModal, users, title }: Props) => {
  const router = useRouter()

  const onUserClickHandler = (username: string) => {
    setShowModal(false)
    router.push(`/${username}`)
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className='absolute top-36 w-full max-w-lg p-5'>
        <div className='rounded-lg bg-primary p-5'>
          <div className='flex items-center justify-between border-b dark:border-b-gray-600 pb-2'>
            <p className='text-lg font-semibold'>{title}</p>
            <button onClick={() => setShowModal(false)}>
              <IoMdClose size={24} />
            </button>
          </div>
          <div className='mt-3 flex flex-col items-start  max-h-96 overflow-x-scroll'>
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => onUserClickHandler(user.username as string)}
              >
                <a>
                  <p>{user.name}</p>
                </a>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default FollowsModal
