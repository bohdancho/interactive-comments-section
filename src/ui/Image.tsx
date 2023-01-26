import * as types from '../types'

export function Image({
  className,
  image,
  alt,
}: {
  className?: string
  image: types.Image
  alt: string
}) {
  return (
    <picture className={className}>
      <source srcSet={image.webp} type='image/webp' />
      <img src={image.png} alt={alt} />
    </picture>
  )
}
