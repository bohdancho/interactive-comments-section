export function Button({
  children: placeholder,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <button
      className={`${className} w-[104px] bg-moderate-blue hover:bg-light-grayish-blue base-transition text-white p-12 rounded`}
      onClick={(e) => e.preventDefault()}
    >
      {placeholder}
    </button>
  )
}
