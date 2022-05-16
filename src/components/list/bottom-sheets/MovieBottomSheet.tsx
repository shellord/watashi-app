import Sheet from 'react-modal-sheet'

type Props = {
  open: boolean
  setShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
}

const MovieBottomSheet = ({ open, setShowBottomSheet }: Props) => {
  const onDismiss = () => {
    setShowBottomSheet(false)
  }

  return (
    <Sheet
      isOpen={open}
      onClose={onDismiss}
      springConfig={{ stiffness: 150, damping: 20, mass: 1 }}
    >
      <Sheet.Container onViewportBoxUpdate={''}>
        <Sheet.Header onViewportBoxUpdate={''} />

        <Sheet.Content onViewportBoxUpdate={''}>
          <div>d</div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onViewportBoxUpdate={''} />
    </Sheet>
  )
}

export default MovieBottomSheet
