import * as types from '../types'

export function Image({ image, alt }: { image: types.Image; alt: string }) {
  return (
    <picture>
      <source srcSet={image.webp} type='image/webp' />
      <img src={image.png} alt={alt} />
    </picture>
  )
}
