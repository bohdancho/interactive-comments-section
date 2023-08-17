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
  onEnter,
}: {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  prefix?: string
  focusOnInit?: boolean
  focusTrigger?: boolean
  setFocusTrigger?: Dispatch<SetStateAction<boolean>>
  className?: string
  placeholder?: string
  onEnter?: () => void
}) {
  const [isControlKeyDown, setIsControlKeyDown] = useState(false)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)

  const [labelWidth, setLabelWidth] = useState(0)
  const randomId = useMemo(() => (Math.random() + 1).toString(36).substring(7), [])

  const resize = () => {
    if (!textAreaRef.current) {
      return
    }
    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
  }

  const focus = (element: HTMLTextAreaElement) => {
    element.focus()
    element.selectionStart = element.value.length
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    switch (e.key) {
      case 'Enter':
        if (isControlKeyDown && onEnter) {
          onEnter()
        }
        return
      case 'Control':
        setIsControlKeyDown(true)
        return
    }
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Control') {
      setIsControlKeyDown(false)
    }
  }

  const onInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)
  }

  useEffect(() => {
    const textAreaElement = textAreaRef.current
    if (focusTrigger && setFocusTrigger && textAreaElement) {
      focus(textAreaElement)
      setFocusTrigger(false)
    }
  }, [focusTrigger])

  useLayoutEffect(resize, [value, textAreaRef])
  useLayoutEffect(() => {
    setValue(value)

    const textAreaElement = textAreaRef.current
    if (focusOnInit && textAreaElement) {
      focus(textAreaElement)
    }
  }, [textAreaRef])

  useLayoutEffect(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current?.offsetWidth)
    }
  }, [labelRef])

  return (
    <div className={`${className} relative`}>
      {prefix ? (
        <label ref={labelRef} className='absolute top-12 left-24 pt-[1px]' htmlFor={randomId}>
          {prefix}
        </label>
      ) : null}
      <textarea
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onInput={onInput}
        id={randomId}
        ref={textAreaRef}
        style={{ textIndent: labelWidth + 2 }}
        className='py-12 px-24 overflow-y-hidden w-full h-full border border-light-gray border-1 rounded focus:placeholder-transparent focus:border-moderate-blue outline-none resize-none'
        placeholder={prefix ? undefined : placeholder}
        value={value}
        rows={2}
      ></textarea>
    </div>
  )
}
