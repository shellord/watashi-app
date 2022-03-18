import { useCallback, useRef, useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

import DeleteCommentModal from '@/components/Comments/DeleteCommentModal'

type Props = {
  id: string
  isSameUser: boolean
}

const CommentMenu = ({ id, isSameUser }: Props) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleClickOutside = useCallback((event: Event) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false)
    }
  }, [])

  if (showMenu) {
    document.addEventListener('click', handleClickOutside)
  }
  if (!showMenu) {
    document.removeEventListener('click', handleClickOutside)
  }
  return (
    <div className='relative' ref={menuRef}>
      <button
        className='hover:bg-gray-50 rounded'
        onClick={() => setShowMenu(!showMenu)}
      >
        <HiOutlineDotsHorizontal className='text-gray-600' size={18} />
      </button>
      {showMenu && (
        <div className='absolute right-0 border w-36 rounded-lg shadow p-1 bg-white z-20'>
          <div className='flex flex-col'>
            {isSameUser && (
              <button
                className='hover:bg-pink-50 rounded-lg text-left p-2'
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            )}

            <button className='hover:bg-pink-50 rounded-lg p-2 text-left'>
              Report
            </button>
          </div>
        </div>
      )}
      <DeleteCommentModal
        id={id}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
      />
    </div>
  )
}

export default CommentMenu
