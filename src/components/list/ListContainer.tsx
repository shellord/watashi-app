import ListItemCard from './ListItemCard'
import ItemDetails from './details/ItemDetails'
import type { Category, Item } from '@prisma/client'
import { useState } from 'react'

import { BottomSheet } from '@/components/ui/BottomSheet'

type Props = {
  listName: String
  listItems: Item[]
  category: Category
}

const ListContainer = ({ listName, listItems, category }: Props) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item>()

  const showItemDetailsModalHandler = (item: Item) => {
    setSelectedItem(item)
    setShowBottomSheet(true)
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

      <BottomSheet
        show={showBottomSheet}
        setShow={setShowBottomSheet}
        className='bg-primary max-w-2xl mx-auto'
        key={'bottom-sheet'}
      >
        {selectedItem && (
          <ItemDetails itemId={selectedItem.itemId} category={category} />
        )}
      </BottomSheet>
    </>
  )
}

export default ListContainer
