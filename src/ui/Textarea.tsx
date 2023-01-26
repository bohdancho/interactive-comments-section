import { ChangeEvent, useEffect, useRef, useState } from 'react'

export function Textarea({
  defaultValue,
  fixedValue,
  focusLastChar,
  className,
  placeholder,
}: {
  defaultValue?: string
  fixedValue?: string
  focusLastChar?: boolean
  className?: string
  placeholder?: string
}) {
  const [val, setVal] = useState((fixedValue ?? '') + (defaultValue ?? ''))
  const ref = useRef<HTMLTextAreaElement>(null)

  const resize = () => {
    if (!ref.current) {
      return
    }
    ref.current.style.height = 'auto'
    ref.current.style.height = ref.current.scrollHeight + 'px'
  }

  const onInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value

    if (!fixedValue || newValue.startsWith(fixedValue)) {
      setVal(newValue)
    }
  }

  useEffect(resize, [val])
  useEffect(() => {
    if (!focusLastChar) {
      return
    }

    ref.current?.setSelectionRange(val.length, val.length)
    ref.current?.focus()
  })

  return (
    <textarea
      onInput={onInput}
      ref={ref}
      className={`${className} py-12 px-24 overflow-y-hidden block w-full border border-light-gray border-1 rounded focus:placeholder-transparent focus:border-moderate-blue outline-none resize-none`}
      placeholder={placeholder}
      value={val}
      rows={2}
    ></textarea>
  )
}
