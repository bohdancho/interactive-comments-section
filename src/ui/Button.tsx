export function Button({ placeholder }: { placeholder: string }) {
  return (
    <button
      className='bg-moderate-blue hover:bg-light-grayish-blue base-transition text-white py-12 px-32 rounded'
      onClick={(e) => e.preventDefault()}
    >
      {placeholder}
    </button>
  )
}
