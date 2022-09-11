

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { getToken, userIsAuthenticated } from '../auth/auth'

const LocationSingle = () => {

  const { locationId } = useParams()


  const [ locations, setLocations ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const [ reviews, setReviews ] = useState([])
  const [ liking, setLiking ] = useState([])
  const [ like, setLikes ] = useState([])
  const [formData, setFormData] = useState([])

  function allLikes(event, likes) {
    setLiking(liking + 1)
    if (event.target.value === likes) {
      setLiking(likes += 1)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/locations/${locationId}`)
        console.log(data)
        setLocations(data)
        // reviews
        setReviews(data.reviews)
        setLikes(data.likes)
        console.log('likes ---->', data.likes)
        console.log('dataaa ---->', data.reviews)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    } 
    getData()
  }, [])

  const headers = () => {
    const token = getToken().split(' ')[1]
    return {
      headers: { Authorization: `Bearer ${getToken()}` },

    }
  }

  const handleAddComment = async (event) => {
    event.preventDefault()
    try {
      console.log(getToken())
      console.log('form data -->', formData)

      const { data } = await axios.post('/api/reviews/',formData, headers())
      // console.log('form data -->', formData)
      setLocations(data)
      // body: JSON.stringify(review)

      setFormData({ text: '', location: '', owner: '' })
      console.log('res-->', data)

    } catch (error) {
      // console.log('error message-->', error.data.message)
      // setError(e.data.message)
      // toast.error(error.data.message, {
      //   position: 'bottom-center',
      //   autoClose: 1200,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // })
      console.log(error)
      // console.log('error message-->', e.res)

    }
  }

  const handleReviewChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }


  return (
    <Container as="main">
      <Row>
        { locations ? 
          <>
            <h1>{locations.name}</h1>
            <Col md="6">
              <img className='w-100' src={locations.location_images} alt={locations.name} />
            </Col>
            <Col md="6">
              <h2>Description</h2>
              <p>{locations.history}</p>
              <hr />
              <h2><span>🌍</span> Origin</h2>
              <p>{locations.creatures[0].name}</p>
              <hr />
              <Col md="6">
                <img className='w-100' src={locations.creatures[0].images} alt={locations.name} />
              </Col>
              <h2><span></span> Added by</h2>
              <p>{locations.trivia}</p>
              <hr />
              <h2><span></span> Likes</h2>
              <p>{locations.likes}</p>
              <p>{locations.dislikes}</p>
              <hr />
              <Link to="/locations" className='btn dark'>Back to all Home</Link>
            </Col>
            <div className='likes'>
              <Button className='btn btn-primary btn-lg btn-block' variant="primary" size="lg" value={like.likes} onClick={(event) => {
                console.log({ like })
                allLikes(event, like ) 
              } }>{like.likes}</Button>
            </div>
            <div className='dislike-button'>
              <Button className='btn btn-primary btn-lg btn-block' variant="primary" size="lg" value={like.likes} onClick={(event) => {
                console.log({ like })
                allLikes(event, like ) 
              } }>{like.dislike}</Button>
            </div>
            
            <Container as='section' className='review-card'>
              <h3>Reviews</h3>
              { reviews.length > 0
                ?
                reviews.map(review => {
                  const { id, owner, text } = review
                  return (                       
                    <Card key={review.id} className="re-card">
                      <Card.Body>      
                        <Card.Text>
                          {review.text} - {review.owner.username}
                        </Card.Text>                 
                      </Card.Body>
                    </Card>          
                  )
                })
                :
                <>
                  { errors ? <h2>Something went wrong.</h2> : <p>Loading</p>}
                </>
              }
            </Container>


            <form
              className="d-flex flex-column justify-content-between"
              onSubmit={handleAddComment}>
              <textarea
                name="text"
                placeholder="What do you think about this location?"
                maxLength="280"
                onChange={handleReviewChange}
                required
              >
              </textarea>
              <textarea
                name="location"
                placeholder="location"
                maxLength="280"
                onChange={handleReviewChange}
                required
              >
              </textarea>
              <textarea
                name="owner"
                placeholder="owner"
                maxLength="280"
                onChange={handleReviewChange}
                required
              >
              </textarea>
              {/* {formData.text} */}
              {/* </textarea> */}
              <input type="submit" value="Add Comment" required />
            </form>
          </>
          :
          <h2 className="text-center">
            Error.
          </h2>
        }
      </Row>

    </Container>
  )
}

export default LocationSingle