

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import YoutubeEmbed from './YoutubeEmbed'

import { getToken, userIsAuthenticated } from '../auth/auth'

const LocationSingle = () => {
  const navigate = useNavigate()
  const { locationId } = useParams()


  const [ locations, setLocations ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const [ reviews, setReviews ] = useState([])
  const [ liking, setLiking ] = useState([])
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

  const allLikes = (event, likes) => {
    setLiking(liking + 1)
    if (event.target.value === likes) {
      setLiking(likes += 1)
    }
  }

  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/locations/${locationId}`)
      console.log(data)
      setLocations(data)
      setReviews(data.reviews)
      setLikes(data.likes)
      setOwner(data.owner)
      console.log('owner  ---->', data.owner)
      console.log('likes  ---->', data.likes)
      console.log('data   ---->', data.reviews)
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
      getData()
      setLocations(data)
      setFormData({ text: '', location: '', owner: '' })
      // window.location.reload()

      console.log('res-->', data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleReview = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  // Update reviews
  const submitUpdateReview = async (event) => {
    // event.preventDefault()
    try {
      console.log(getToken())
      console.log('form data -->', formData)
      const { data } = await axios.put(`/api/reviews/${event.target.name}/`, updateReview, headers())
      getData()
      // setFormData({ text: '', location: '', owner: '' }) 
      setUpdateReview({ text: '', location: '', owner: '' }) 
      console.log('update data ----->', data.reviews[0].text)
    } catch (e) {
      setErrors(e)
      console.log(errors)
    }
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

  const handleEdit = (event) => {
    setUpdateReview(true)
    console.log('setUpdate')
  }

  //! Likes

  const handleAddLike = async (event) => {
    // event.preventDefault()
    try {
      console.log(getToken())
      console.log('form data -->', formData)

      const { data } = await axios.post(`/api/location/${locationId}`, headers())
      
      setLikes(data.likes)
      window.location.reload()

      console.log('res-->', data)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Container as='main'>
        <Row>
          { locations ? 
            <>
              <h1>{locations.name}</h1>
        
              <Col md='6'>
                <img className='w-100' src={locations.location_image_1} alt={locations.name} />
              </Col>
              <Col md='6'>
                <h2>History</h2>
                <p>{locations.history}</p>
                <hr />
                <h2>Creatures</h2>
                { locations.creatures && 
                <>
                  <p>{locations.creatures[0].name}</p>
                  <hr />
                  <Col md='6'>
                    <img className='w-100' src={locations.creatures[0].image1} alt={locations.name} />
                  </Col>
                </>
                }
                <h2><span></span>Description</h2>
                <p>{locations.trivia}</p>
                <hr />
                {locations.youtube_id && 
                <Col className='title-media mb-4 justify-content-center mt-4'>
                  <div className='youtube'>
                    <YoutubeEmbed embedId={locations.youtube_id} />
                  </div>
                </Col>
                }
                <hr />
                <Link to='/locations' className='btn dark'>Back to all Locations</Link>
              </Col>
              
              {/* <div className='likes'>
                <Button className='btn btn-primary' variant='primary' size='lg' onClick={(event) => {
                  console.log({ likes })
                  allLikes(event, likes ) 
                } }>{locations.likes.length += 1}</Button>
              </div>
              <div className='dislike-button'>
                <Button className='btn btn-primary' variant='primary' size='lg' onClick={(event) => {
                  (event, likes ) 
                } }>{locations.dislikes.length += 1}</Button>
              </div> */}


              {/* COMMENTS SECTION */}
              <form onSubmit={handleAddComment} >
                <div className='grid grid-cols-3'>
                  <div className='col-span-2'>
                    <div className={update && owner === reviews.owner ? 'review-display hide' : 'review-display'}>
                      <h3>Reviews</h3>
                      { reviews.length > 0
                        ?
                        reviews.map(review => {
                          const { id, owner, text } = review
                          return (                       
                            <div key={review.id} data-bs-spy='scroll' data-bs-target='#scrollspy1' data-bs-offset='200' className='scrollspy-example'>
                              
                              <section>
                                <h3 className='text-xl font-semibold pt-5 pb-3'>{review.owner.username}</h3>
                                <p>
                                  {review.text}
                                </p>                 
                        
                              
                                <div className="buttons">
                      
                                </div>
                                <div className='mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600'>
                                  <div className='py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800'>
                                    <label htmlFor='comment' className='sr-only'>Your comment</label>
                                    <textarea id='comment' rows='4' className='px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400' name='text' value={formData.text} maxLength='280' onChange={handleReview} placeholder='Write a comment...' required></textarea>
                                  </div>
                                  <div className='flex justify-between items-center py-2 px-3 border-t dark:border-gray-600'>
                                    <button type="submit" value="Add Comment" name={locationId} required className=" btn btn-primary inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                    Post Review
                                    </button>
                                    <button name={review.id} onClick={handleDelete}> 
                                      Delete
                                    </button>
                                    {owner === reviews.owner ? (
                                      <button name={reviews.id} value={formData.text} onClick={handleEdit}>
                                        Edit
                                      </button>
                                      
                                    ) : (
                                      <></> 
                                    )} 
                                    {owner === reviews.owner ? (
                                      <button name={reviews.id} onClick={handleDelete}>
                                        🗑
                                      </button>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                    
                                
                                </div>
                              </section>
                            </div>          
                          )
                        })
                        :
                        <>
                          { errors ? <h2>Something went wrong.</h2> : <p>Loading</p>}
                        </>
                      }
                    </div>
                    
                  </div>

                  {/* <form onSubmit={handleAddComment} > */}
               
                </div>
              </form>
        

         
            </>
            :
            <h2 className='text-center'>
              { errors ? <h2>Something went wrong.</h2> : <p>Loading</p>}
            </h2> 
          }
        </Row>
      </Container>
    </>
  )
}

export default LocationSingle


