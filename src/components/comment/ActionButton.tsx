import iconDelete from '../../assets/icon-delete.svg'
import iconEdit from '../../assets/icon-edit.svg'
import iconReply from '../../assets/icon-reply.svg'

export function ActionButton({ type }: { type: 'delete' | 'edit' | 'reply' }) {
  const text = type[0].toUpperCase() + type.slice(1)
  let icon
  let colorClass
  switch (type) {
    case 'delete':
      icon = iconDelete
      colorClass = 'text-soft-red'
      break
    case 'edit':
      icon = iconEdit
      colorClass = 'text-moderate-blue'
      break
    case 'reply':
      icon = iconReply
      colorClass = 'text-moderate-blue'
      break
  }

  return (
    <button className='flex items-center gap-8'>
      <img src={icon} alt={type} />
      <span className={`font-medium ${colorClass}`}>{text}</span>
    </button>
  )
}
