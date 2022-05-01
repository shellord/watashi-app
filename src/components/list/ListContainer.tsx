import ListItemCard from './ListItemCard'
import type { Category, Item } from '@prisma/client'

type Props = {
  listName: String
  listItems: Item[]
  category: Category
}
const ListContainer = ({ listName, listItems, category }: Props) => {
  return (
    <>
      <div className='mb-3 border-b pb-2'>
        <p className='text-lg font-bold'>{listName}</p>
      </div>
      <div className='flex space-x-3 overflow-x-auto'>
        {listItems.map((item) => (
          <div key={item.id}>
            <ListItemCard
              title={item.title}
              image={item.posterPath}
              category={category}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default ListContainer
