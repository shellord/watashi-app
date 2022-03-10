import Modal from '@/components/ui/Modal'
import { User } from '@/types/user'
import React from 'react'
import { IoMdClose } from 'react-icons/io'
import Link from 'next/link'

type Props = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  users: User[]
  title: string
}

const FollowsModal = ({ showModal, setShowModal, users, title }: Props) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className='absolute top-36 w-full max-w-lg p-5'>
        <div className='rounded-lg bg-white p-5'>
          <div className='flex items-center justify-between border-b pb-2'>
            <p className='text-lg font-semibold'>{title}</p>
            <button onClick={() => setShowModal(false)}>
              <IoMdClose size={24} />
            </button>
          </div>
          <div className='mt-3'>
            {users.map((user) => (
              <Link key={user.id} href={`/${user.username}`}>
                <a>
                  <p>{user.name}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default FollowsModal
