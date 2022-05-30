import { Category } from '@prisma/client'
import Sheet from 'react-modal-sheet'

import useGetItemDetails from '@/hooks/useGetItemDetails'

type Props = {
  open: boolean
  setShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
  category: Category
  itemId: string
}

const BottomSheet = ({ open, setShowBottomSheet, category, itemId }: Props) => {
  const { data, isLoading } = useGetItemDetails(category, itemId)

  const onDismiss = () => {
    setShowBottomSheet(false)
  }

  return (
    <Sheet
      isOpen={open}
      onClose={onDismiss}
      springConfig={{ stiffness: 150, damping: 20, mass: 1 }}
      className='max-w-2xl mx-auto'
      snapPoints={[600]}
      initialSnap={0}
    >
      <Sheet.Container
        onViewportBoxUpdate={''}
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <Sheet.Header onViewportBoxUpdate={''} />

        <Sheet.Content onViewportBoxUpdate={''}>
          <div className='text-red-500'>hello</div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop
        onViewportBoxUpdate={''}
        onTap={() => setShowBottomSheet(false)}
      />
    </Sheet>
  )
}

export default BottomSheet
