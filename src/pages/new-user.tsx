const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  console.log(event.currentTarget)
}
const NewUser = () => {
  return (
    <div className='mt-2 flex flex-col bg-white p-10 shadow-sm'>
      <p className='text-xl font-bold'>Welcome to watashi.app</p>
      <form onSubmit={handleSubmit} className='mt-3 w-1/2'>
        <div className='flex items-center justify-between'>
          <label htmlFor='username' className='flex'>
            Username
          </label>
          <input
            id='username'
            className='input-field flex'
            type='text'
            placeholder='Username'
            required
            maxLength={20}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <label htmlFor='username' className='flex flex-1'>
            Bio
          </label>
          <textarea
            id='username'
            className='input-field flex'
            placeholder='Username'
            required
            maxLength={20}
          />
        </div>
        <div className='flex'>
          <button type='submit' className='btn mt-5'>
            Create Account
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewUser
