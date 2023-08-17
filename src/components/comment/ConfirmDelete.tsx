import { DispatchWithoutAction, MouseEventHandler } from 'react'

export function ConfirmDelete({
  deleteComment,
  toggleDeleting,
}: {
  deleteComment: () => void
  toggleDeleting: DispatchWithoutAction
}) {
  const deleteAndClose = () => {
    toggleDeleting()
    deleteComment()
  }
  const onBackgroundClick: MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      toggleDeleting()
    }
  }

  const buttonClasses = 'text-white rounded py-12 uppercase font-medium'

  return (
    <div
      onClick={onBackgroundClick}
      className='p-16 fixed left-0 top-0 z-10 w-full h-full backdrop-brightness-50 flex items-center justify-center'
    >
      <div className='max-w-[400px] py-24 px-28 tablet:p-32 flex flex-col gap-16 tablet:gap-20 rounded-lg bg-white'>
        <h1 className='text-dark-blue text-xl font-medium'>Delete comment</h1>
        <p className='leading-normal text-grayish-blue'>
          Are you sure you want to delete this comment? This will remove the comment and can’t be
          undone.
        </p>
        <div className='grid grid-cols-2 gap-12 tablet:gap-16'>
          <button className={`${buttonClasses} bg-grayish-blue`} onClick={toggleDeleting}>
            no, cancel
          </button>
          <button className={`${buttonClasses} bg-soft-red`} onClick={deleteAndClose}>
            yes, delete
          </button>
        </div>
      </div>
    </div>
  )
}
