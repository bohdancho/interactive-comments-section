export function Button({ placeholder }: { placeholder: string }) {
  return (
    <button
      className='block w-full bg-moderate-blue hover:bg-light-grayish-blue base-transition text-white p-12 rounded'
      onClick={(e) => e.preventDefault()}
    >
      {placeholder}
    </button>
  )
}
