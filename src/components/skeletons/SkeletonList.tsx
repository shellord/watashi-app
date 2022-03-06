const SkeletonList = () => {
  return (
    <div className='animate-pulse'>
      <div className='mb-2 h-2 w-24 rounded bg-slate-300' />
      {[...Array(4)].map((_, i) => (
        <div
          className='mt-3 flex space-x-3 overflow-hidden border-b pb-2'
          key={i}
        >
          {[...Array(5)].map((_, i) => (
            <div key={i}>
              <div className='h-44 w-32 rounded-lg bg-slate-300' />
              <div className='mt-3 h-2 w-32 rounded bg-slate-300' />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default SkeletonList
