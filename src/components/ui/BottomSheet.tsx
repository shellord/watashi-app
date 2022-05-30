import clsx from 'clsx'

type Props = {
  show: boolean
  className?: string
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export const BottomSheet = ({ show, className, setShow, children }: Props) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'bg-black bg-opacity-60 h-screen flex items-end fixed inset-0 z-40 transition-opacity duration-500',
          {
            'opacity-0 pointer-events-none': !show,
            'opacity-100': show,
          }
        )}
        onClick={() => setShow(false)}
        key='bottom-sheet'
      />
      {/* Bottom Sheet */}
      <div className='w-'>
        <div
          className={clsx(
            'h-1/2 fixed bottom-0 right-0 left-0 w-full transition-all duration-500 z-50 shadow-2xl rounded-t-xl',
            {
              'translate-y-full': !show,
              'translate-y-0': show,
            },

            className
          )}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  )
}
