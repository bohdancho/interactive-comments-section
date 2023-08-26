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
      className='fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center p-16 backdrop-brightness-50'
    >
      <div className='flex max-w-[400px] flex-col gap-16 rounded-lg bg-white py-24 px-28 tablet:gap-20 tablet:p-32'>
        <h1 className='text-xl font-medium text-dark-blue'>Delete comment</h1>
        <p className='leading-normal text-grayish-blue'>
          Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
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
