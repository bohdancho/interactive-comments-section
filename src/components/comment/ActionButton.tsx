import iconDelete from '../../assets/icon-delete.svg'
import iconEdit from '../../assets/icon-edit.svg'
import iconReply from '../../assets/icon-reply.svg'
import SVG from 'react-inlinesvg'

export function ActionButton({
  type,
  onClick,
}: {
  type: 'delete' | 'edit' | 'reply'
  onClick?: () => void
}) {
  const text = type[0].toUpperCase() + type.slice(1)
  let icon
  let colorClass
  switch (type) {
    case 'delete':
      icon = iconDelete
      colorClass = 'text-soft-red hover:text-pale-red'
      break
    case 'edit':
      icon = iconEdit
      colorClass = 'text-moderate-blue hover:text-light-grayish-blue'
      break
    case 'reply':
      icon = iconReply
      colorClass = 'text-moderate-blue hover:text-light-grayish-blue'
      break
  }

  return (
    <button
      className={`flex items-center gap-8 base-transition ${colorClass}`}
      onClick={onClick}
    >
      <SVG src={icon} />
      <span className='font-medium'>{text}</span>
    </button>
  )
}
