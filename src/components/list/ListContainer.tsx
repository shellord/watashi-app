import ListItemCard from './ListItemCard'
import type { Category, Item } from '@prisma/client'
import { useState } from 'react'

import Modal from '@/components/ui/Modal'

type Props = {
  listName: String
  listItems: Item[]
  category: Category
}

const ListContainer = ({ listName, listItems, category }: Props) => {
  const isMobile = window.innerWidth < 768 ? true : false
  const [showModal, setShowModal] = useState(false)
  const showItemDetailsModalHandler = (item: Item) => {
    !isMobile && setShowModal(true)
  }
  return (
    <>
      <div className='mb-3 border-b pb-2'>
        <p className='text-lg font-bold'>{listName}</p>
      </div>
      <div className='flex space-x-3 overflow-x-auto'>
        {listItems.map((item) => (
          <div key={item.id}>
            <button onClick={() => showItemDetailsModalHandler(item)}>
              <ListItemCard
                title={item.title}
                image={item.posterPath}
                category={category}
              />
            </button>
          </div>
        ))}
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className='absolute top-96 w-full max-w-lg p-5'>
          <div className='bg-white rounded-lg'>Hello</div>
        </div>
      </Modal>
    </>
  )
}

export default ListContainer
