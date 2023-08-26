import { MouseEventHandler } from 'react'

export function UIButton({
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
      className={`${className} base-transition w-[104px] rounded bg-moderate-blue p-12 text-white hover:bg-light-grayish-blue`}
      onClick={onClickPreventDefault}
    >
      {placeholder}
    </button>
  )
}
