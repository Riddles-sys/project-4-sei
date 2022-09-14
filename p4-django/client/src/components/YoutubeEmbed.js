
import PropTypes from 'prop-types'

const YoutubeEmbed = ({ embedId }) => (

  <iframe
    src={`https://www.youtube.com/embed/${embedId}?autoplay=1&loop=1&mute=0`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded youtube"
  />

)

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
}

export default YoutubeEmbed