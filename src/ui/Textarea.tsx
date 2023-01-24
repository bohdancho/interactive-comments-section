export function Textarea({ placeholder }: { placeholder: string }) {
  return (
    <textarea
      className='py-12 pr-12 pl-24 block w-full border border-light-gray border-1 rounded focus:placeholder-transparent focus:border-moderate-blue outline-none resize-none'
      placeholder={placeholder}
    ></textarea>
  )
}
