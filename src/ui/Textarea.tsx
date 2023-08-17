import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export function Textarea({
  value,
  setValue,
  prefix,
  focusTrigger,
  setFocusTrigger,
  focusOnInit,
  className,
  placeholder,
}: {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  prefix?: string
  focusOnInit?: boolean
  focusTrigger?: boolean
  setFocusTrigger?: Dispatch<SetStateAction<boolean>>
  className?: string
  placeholder?: string
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)

  const [labelWidth, setLabelWidth] = useState(0)

  useEffect(() => {
    if (focusTrigger && setFocusTrigger) {
      textAreaRef.current?.focus()
      setFocusTrigger(false)
    }
  }, [focusTrigger])

  const resize = () => {
    if (!textAreaRef.current) {
      return
    }
    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
  }

  const onInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue.trim())
  }

  useEffect(resize, [value])
  useLayoutEffect(() => {
    setValue(value)

    if (focusOnInit) {
      textAreaRef.current?.focus()
    }
  }, [textAreaRef])

  useLayoutEffect(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current?.offsetWidth)
    }
  }, [labelRef])

  const randomId = useMemo(() => (Math.random() + 1).toString(36).substring(7), [])

  return (
    <div className={`${className} relative`}>
      {prefix ? (
        <label
          ref={labelRef}
          className='absolute top-12 left-24 leading-24 pt-[1px]'
          htmlFor={randomId}
        >
          {prefix}
        </label>
      ) : null}
      <textarea
        onInput={onInput}
        id={randomId}
        ref={textAreaRef}
        style={{ textIndent: labelWidth + 2 }}
        className='py-12 px-24 leading-24 overflow-y-hidden w-full h-full border border-light-gray border-1 rounded focus:placeholder-transparent focus:border-moderate-blue outline-none resize-none'
        placeholder={prefix ? undefined : placeholder}
        value={value}
        rows={2}
      ></textarea>
    </div>
  )
}
