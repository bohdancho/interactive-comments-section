import { ChangeEvent, Dispatch, SetStateAction, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

export function UITextarea({
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

  const handleHeight = () => {
    const textAreaElem = textAreaRef.current
    if (!textAreaElem) {
      return
    }
    textAreaElem.style.height = textAreaElem.scrollHeight + 'px'
    return () => {
      if (textAreaElem) {
        textAreaElem.style.height = 'auto'
      }
    }
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
  }, [focusTrigger, setFocusTrigger])

  useEffect(handleHeight, [value])
  useLayoutEffect(() => {
    const textAreaElem = textAreaRef.current
    if (focusOnInit && textAreaElem) {
      focus(textAreaElem)
    }

    if (labelRef.current) {
      setLabelWidth(labelRef.current?.offsetWidth)
    }
  }, [focusOnInit])

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
        style={prefix ? { textIndent: labelWidth + 2 } : undefined}
        className='border-1 min-h-[72px] w-full resize-none overflow-y-hidden rounded border border-light-gray py-12 px-24 outline-none focus:border-moderate-blue focus:placeholder-transparent'
        placeholder={prefix ? undefined : placeholder}
        value={value}
      ></textarea>
    </div>
  )
}
