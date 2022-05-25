type Props = {
  icon: React.ComponentType<React.ComponentProps<'svg'>>
  label: string
  checked?: boolean
  onClick?: () => void
}

const ListButton = ({ icon: Icon, label, checked, onClick }: Props) => {
  return (
    <div>
      <input
        type='radio'
        id={label}
        name='list-category'
        className='peer hidden'
        defaultChecked={checked}
        onClick={onClick}
      />
      <label
        htmlFor={label}
        className='flex cursor-pointer flex-col items-center bg-secondary p-5 text-primary peer-checked:bg-pink-500 peer-checked:text-white'
      >
        <Icon fontSize={28} />
        <span className='mt-2'>{label}</span>
      </label>
    </div>
  )
}

export default ListButton
