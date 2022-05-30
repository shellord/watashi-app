type Props = {
  name: string
  description: string
  image: string
}

const IMAGE_URL = `https://image.tmdb.org/t/p/w500/`

const MovieDetails = ({ name, description, image }: Props) => {
  return <div>{description}</div>
}

export default MovieDetails
