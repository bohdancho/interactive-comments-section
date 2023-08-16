import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'

export function Textarea({
  value,
  setValue,
  fixedValue,
  focusOnInit,
  className,
  placeholder,
}: {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  fixedValue?: string
  focusOnInit?: boolean
  className?: string
  placeholder?: string
}) {
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

    // if (!fixedValue || newValue.startsWith(fixedValue)) {
    // setVal(newValue)
    // }
    setValue(newValue)
  }

  useEffect(resize, [value])
  useLayoutEffect(() => {
    // setVal((fixedValue ?? '') + (defaultValue ?? ''))
    setValue(value)

    if (focusOnInit) {
      ref.current?.focus()
    }
  }, [ref])

  return (
    <textarea
      onInput={onInput}
      ref={ref}
      className={`${className} py-12 px-24 overflow-y-hidden block w-full border border-light-gray border-1 rounded focus:placeholder-transparent focus:border-moderate-blue outline-none resize-none`}
      placeholder={placeholder}
      value={value}
      rows={2}
    ></textarea>
  )
}
