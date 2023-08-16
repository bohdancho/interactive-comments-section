import { MouseEventHandler } from 'react'

export function Button({
  children: placeholder,
  className,
  onClick,
}: {
  children: string
  className?: string
  onClick: MouseEventHandler
}) {
  const onClickPreventDefault: MouseEventHandler = (e) => {
    e.preventDefault()
    onClick(e)
  }

  return (
    <button
      className={`${className} w-[104px] bg-moderate-blue hover:bg-light-grayish-blue base-transition text-white p-12 rounded`}
      onClick={onClickPreventDefault}
    >
      {placeholder}
    </button>
  )
}
