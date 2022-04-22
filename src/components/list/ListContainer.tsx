import ListItemCard from './ListItemCard'
import type { Item } from '@prisma/client'

type Props = {
  listName: String
  listItems: Item[]
}
const ListContainer = ({ listName, listItems }: Props) => {
  return (
    <>
      <div className='mb-3 border-b pb-2'>
        <p className='text-lg font-semibold'>{listName}</p>
      </div>
      <div className='flex space-x-3 overflow-x-auto'>
        {listItems.map((item) => (
          <div key={item.id}>
            <ListItemCard title={item.title} image={item.posterPath} />
          </div>
        ))}
      </div>
    </>
  )
}

export default ListContainer
