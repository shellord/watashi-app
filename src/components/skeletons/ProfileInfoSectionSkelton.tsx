const ProfileInfoSectionSkelton = () => {
  return (
    <div className='bg-white pb-2'>
      <div className='relative flex flex-col items-center'>
        <div className='flex h-28 w-full bg-gray-300' />
        <div className='absolute top-[3.5rem]'>
          <div className='bg-slate-300 rounded-full w-24 h-24' />
        </div>
        <div className='mt-12 flex flex-col items-center space-y-3'>
          <div className='w-32 h-2 bg-slate-300 animate-pulse' />
          <div className='w-12 h-2 bg-slate-300 animate-pulse' />
          <div className='w-24 h-2 bg-slate-300 animate-pulse' />
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoSectionSkelton
