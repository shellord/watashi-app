import { useDrag } from '@use-gesture/react'
import clsx from 'clsx'
import { useCallback, useEffect } from 'react'
import { animated, config, useSpring } from 'react-spring'

type Props = {
  show: boolean
  className?: string
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export const BottomSheet = ({ show, className, setShow, children }: Props) => {
  useEffect(() => {
    show
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')
  }, [show])

  const height = window.innerHeight / 2

  const [{ y }, api] = useSpring(() => ({ y: height }))

  const bind = useDrag(
    ({
      last,
      movement: [_mx, my],
      velocity: [_vx, vy],
      direction: [_dx, dy],
      cancel,
      canceled,
    }) => {
      if (my < -100) {
        cancel()
      }
      if (last) {
        my > height * 0.5 || (vy > 0.5 && dy > 0)
          ? close(vy)
          : open({ canceled })
      } else api.start({ y: my })
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  )

  const open = useCallback(
    ({ canceled }: { canceled: boolean }) => {
      api.start({
        y: 0,
        immediate: false,
        config: canceled ? config.wobbly : config.stiff,
      })
    },
    [api]
  )

  const close = useCallback(
    (velocity = 0) => {
      api.start({ y: height, config: { ...config.stiff, velocity } })
      setShow(false)
    },
    [api, setShow, height]
  )

  useEffect(() => {
    if (show) {
      open({ canceled: false })
    } else {
      close()
    }
  }, [show, open, close])

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'bg-black/60 h-screen flex items-end fixed inset-0 z-40 transition-opacity duration-500',
          {
            'opacity-0 pointer-events-none': !show,
            'opacity-100': show,
          }
        )}
        onClick={() => setShow(false)}
        key='bottom-sheet'
      />
      {/* Bottom Sheet */}
      <animated.div
        {...bind()}
        style={{ y, touchAction: 'none', bottom: `calc(-100vh + ${height}px)` }}
        className={clsx(
          'h-screen fixed bottom-0 right-0 left-0 w-full z-50 shadow-2xl rounded-t-xl',
          className
        )}
      >
        <div className='overflow-y-scroll flex h-1/2'>{children}</div>
      </animated.div>
    </>
  )
}
