import { ChangeEvent, useEffect, useRef, useState } from 'react'

export function Textarea({
  children: defaultValue,
  placeholder,
}: {
  placeholder: string
  children?: string
}) {
  const [val, setVal] = useState(defaultValue)
  const ref = useRef<HTMLTextAreaElement>(null)

  const resize = () => {
    if (!ref.current) {
      return
    }
    ref.current.style.height = 'auto'
    ref.current.style.height = ref.current.scrollHeight + 'px'
  }

  const onInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setVal(e.target.value)
  }

  useEffect(resize, [val])

  return (
    <textarea
      onInput={onInput}
      ref={ref}
      className='py-12 px-24 overflow-y-hidden block w-full border border-light-gray border-1 rounded focus:placeholder-transparent focus:border-moderate-blue outline-none resize-none'
      placeholder={placeholder}
      value={val}
      rows={2}
    ></textarea>
  )
}
