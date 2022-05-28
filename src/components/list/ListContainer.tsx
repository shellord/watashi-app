import BottomSheet from './BottomSheet'
import ListItemCard from './ListItemCard'
import type { Category, Item } from '@prisma/client'
import { useState } from 'react'

import ItemDetailsModal from '@/components/list/modals/ItemDetailsModal'

type Props = {
  listName: String
  listItems: Item[]
  category: Category
}

const ListContainer = ({ listName, listItems, category }: Props) => {
  const isMobile = window.innerWidth < 768 ? true : false
  const [showModal, setShowModal] = useState(false)
  const [showBottomSheet, setShowBottomSheet] = useState(false)

  const showItemDetailsModalHandler = (item: Item) => {
    return
    if (!isMobile) {
      setShowBottomSheet(true)
    } else {
      setShowModal(true)
    }
  }

  return (
    <>
      <div className='mb-3 border-b dark:border-black pb-2'>
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

      {/* For Desktop */}
      <ItemDetailsModal showModal={showModal} setShowModal={setShowModal} />

      {/* For Mobile */}
      <BottomSheet
        open={showBottomSheet}
        setShowBottomSheet={setShowBottomSheet}
      />
    </>
  )
}

export default ListContainer
