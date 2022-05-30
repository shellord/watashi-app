import { Category } from '@prisma/client'

import useGetItemDetails from '@/hooks/useGetItemDetails'

import MovieDetails from '@/components/list/details/MovieDetails'
import Modal from '@/components/ui/Modal'

type Props = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  category: Category
  itemId: string
}

const ItemDetailsModal = ({
  showModal,
  setShowModal,
  category,
  itemId,
}: Props) => {
  const { data, isLoading } = useGetItemDetails(category, itemId)

  console.log(data)
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className='absolute top-96 w-full max-w-lg p-5'>
        <div className='bg-primary rounded-lg'>
          {category === 'MOVIE' && (
            <MovieDetails
              name={data.original_title}
              description={data.overview}
              image={data.poster_path}
            />
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ItemDetailsModal
