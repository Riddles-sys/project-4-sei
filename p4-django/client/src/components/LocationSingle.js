
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import YoutubeEmbed from './YoutubeEmbed'
import loaderImg from '../images/loader.gif'

import { Carousel } from 'react-responsive-carousel'
import { getToken, userIsAuthenticated } from '../auth/auth'

const LocationSingle = () => {
  const navigate = useNavigate()
  const { locationId } = useParams()


  const [ location, setLocation ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const [ likes, setLikes ] = useState([])
  const [formData, setFormData] = useState({
    text: '',
    location: parseInt(locationId),
  })
  const [ owner, setOwner ] = useState([])
  const [ update, setUpdate ] = useState(false)
  const [ updateReview, setUpdateReview ] = useState({
    text: '',
    location: parseInt(locationId),
  })

  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/locations/${locationId}`)
      console.log('single location',data)
      setLocation(data)
    

    } catch (error) {
      setErrors(error.message)

      console.log(error.message)
    }
  } 

  useEffect(() => {

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

      const { data } = await axios.post('/api/reviews/', formData, headers() )
      window.location.reload()
      setLocation(data)
      setFormData({ ...formData, text: '' })
      console.log('res-->', data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleReview = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }



  // Delete comments
  const handleDelete = async (event) => {
    console.log('comment to delete -->', event.target.name)
    try {
      const { data } = await axios.delete(`/api/reviews/${event.target.name}/`,
        headers()
      )
      console.log('delete data ----->', data)
      
      getData()
    } catch (e) {
      setErrors(e)
      console.log(errors)
    }
  }

  const submitHandleEdit = (event) => {
    setUpdateReview(true)
    console.log('setUpdate')
  }

  useEffect(() => {
    console.log('location', location)
  }, [location])


  return (
    <>
      <Container as='main'>
        <Row>
          { location ? 
            <>
       
              <h1>{location.name}</h1>
         
              <Col md='6'>
                <Carousel showArrows={true} >
                  {/* <div className='youtube'>
                    <YoutubeEmbed embedId={location.youtube_id} />
                  </div> */}
                  <div>
                    <img src={location.location_image_1} />
                    <p className="legend">{location.name}</p>
                  </div>
                  <div>
                    <img src={location.location_image_2} />
                    <p className="legend">{location.name}</p>
                  </div>
                  <div>
                    <img src={location.location_image_3} />
                    <p className="legend">{location.name}</p>
                  </div>
                </Carousel>
                {/* <img className='w-100' src={location.location_image_1} alt={location.name} /> */}
              </Col>
              <Col md='6'>
                <h2>History</h2>
                <p>{location.history}</p>
                <h3>Description</h3>
                <p>{location.trivia}</p>
                <hr />
                <h3>Risk Level</h3>
                <p>{location.risk}</p>
                <hr />
                <h3>Inhabitants</h3>
                { location.inhabitants.length > 0 &&
                <>
                  <p>{location.inhabitants.name}</p>
                  <hr />
                  <Col>
                    <Carousel className='w-100 h-100' showArrows={true} >
                      {/* <div className='youtube'>
                        <YoutubeEmbed embedId={location.youtube_id} />
                      </div> */}
                      <div>
                        <img src={location.inhabitants[0].image1} />
                        <p className="legend">{location.name}</p>
                      </div>
                      <div>
                        <img src={location.inhabitants[0].image2} />
                        <p className="legend">{location.name}</p>
                      </div>
                      <div>
                        <img src={location.inhabitants[0].image3} />
                        <p className="legend">{location.name}</p>
                      </div>
                    </Carousel>
                  </Col>
                </>
                }
                <h3>Creatures</h3>
                { location.creatures.length > 0 &&
                <>
                  <p>{location.creatures.name}</p>
                  <hr />
                  <Col>
                    <Carousel className='w-100 h-100' showArrows={true} >
                      {/* <div className='youtube'>
                        <YoutubeEmbed embedId={location.youtube_id} />
                      </div> */}
                      <div>
                        <img src={location.creatures[0].image1} />
                        <p className="legend">{location.name}</p>
                      </div>
                      <div>
                        <img src={location.creatures[0].image2} />
                        <p className="legend">{location.name}</p>
                      </div>
                      <div>
                        <img src={location.creatures[0].image3} />
                        <p className="legend">{location.name}</p>
                      </div>
                    </Carousel>
                  </Col>
                </>
                }
                {location.youtube_id && 
                <Col className='title-media mb-4 justify-content-center mt-4'>
                  <div className='youtube'>
                    <YoutubeEmbed embedId={location.youtube_id} />
                  </div>
                </Col>
                }
                <hr />
                <Link to='/locations' className='btn dark'>Back to all Locations</Link>
              </Col>
              {/* COMMENTS SECTION */}
              <form onSubmit={submitHandleEdit} >
                <div className='grid grid-cols-3'>
                  <div className='col-span-2'>

                    <h3>Reviews</h3>
                    { location.reviews.length > 0
                      &&
                      location.reviews.map(review => {
                        const { id, owner, text } = review
                        return (                       
                        
                            
                          <section key={id} >
                            <h3 className='text-xl font-semibold pt-2 pb-2 border-t dark:border-gray-600'>{review.owner.username}</h3>
                            <p>
                              {review.text}
                            </p>
                            <button className='btn btn-warning' name={review.id} onClick={handleDelete}> 
                              Delete
                            </button>
                            <Link to={`/edit-review/${locationId}/${review.id}`} className='btn dark'>
                              <button className='btn btn-warning'>
                              Edit </button></Link>
                            <div className="buttons">
                            </div>
                          </section>
                        )
                      })
                    }
                  </div>
                </div>
              </form>
            </>
            :
            <h2 className='text-center'>
              { errors ? <h2> Something went wrong.</h2> : <img src={loaderImg} /> }
            </h2> 
          }
        </Row>
        <form onSubmit={handleAddComment}>
          <div className='mb-4 w-full h-1/2 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 pt-2'>
            <div className='py-2 px-4 bg-white rounded-t-lg dark:bg-gray-600'>
              <label htmlFor='comment' className='sr-only'>Your comment</label>
              <textarea id='comment' rows='4' className='px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400' name='text' value={formData.text} maxLength='280' onChange={handleReview} placeholder='Write a comment...' required></textarea>
            </div>
            <div className='flex justify-between items-center py-2 px-3 border-t dark:border-gray-600 '>
              <button type="submit" value="Add Comment" name={locationId} required className=" btn btn-primary inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Post Review
              </button>
            </div>
          </div>
        </form>
          
     
      </Container>
    </>
  )
}

export default LocationSingle

