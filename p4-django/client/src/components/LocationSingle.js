

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import YoutubeEmbed from './YoutubeEmbed'

import { getToken, userIsAuthenticated } from '../auth/auth'

const LocationSingle = () => {
  const navigate = useNavigate()
  const { locationId } = useParams()


  const [ locations, setLocations ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const [ reviews, setReviews ] = useState([])
  // const [ liking, setLiking ] = useState([])
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

  // const allLikes = (event, likes) => {
  //   setLiking(liking + 1)
  //   if (event.target.value === likes) {
  //     setLiking(likes += 1)
  //   }
  // }

  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/locations/${locationId}`)
      console.log(data)
      setLocations(data)
      setReviews(data.reviews)
      setLikes(data.likes[0])
      
      setOwner(data.owner)
      setLoading(false)
      console.log('owner  ---->', data.owner)
      console.log('likes  ---->', data.likes[0])
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

  // //! Likes

  // const handleAddLike = async (event) => {
  //   // event.preventDefault()
  //   try {
  //     console.log(getToken())
  //     console.log('form data -->', formData)



      
  //     const { data } = await axios.get(`/api/locations/${locationId}`)
  //     const userId = 4
  //     data.likes.push(userId)
  //     console.log('data log', data)
  //     console.log('res 2--', data.likes)
  //     console.log(headers())
  //     const res = await axios.put(`/api/locations/${locationId}/`, data, headers())
  //     // console.log('res', res)

  //     setLikes(data.likes)
   
  //     console.log('res-->', data)

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const [ loading, setLoading ] = useState(true)

  if (errors) return <h2>You are are not the authorised user. <Link></Link></h2>
  if (loading) return <h2>loading</h2>

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
                <Button className='btn btn-primary' variant='primary' size='lg' onClick={handleAddLike}>
                  Likes {likes.length}</Button>{console.log('likes ------------------>', likes)}
              </div>  */}
              {/* <div className='dislike-button'>
                <Button className='btn btn-primary' variant='primary' size='lg' onClick={(event) => {
                  (event, likes ) 
                } }>{locations.dislikes.length += 1}</Button>
              </div>  */}
              {/* <div class="flex mx-auto items-center justify-center shadow-lg mt-56 mx-8 mb-4 max-w-lg">
                <form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                    <div class="flex flex-wrap -mx-3 mb-6">
                      <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                      <div class="w-full md:w-full px-3 mb-2 mt-2">
                          <textarea class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
                      </div>
                      <div class="w-full md:w-full flex items-start md:w-full px-3">
                          <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                            <svg fill="none" class="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <p class="text-xs md:text-sm pt-px">Some HTML is okay.</p>
                          </div>
                          <div class="-mr-1">
                            <input type='submit' class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment' />
                          </div>
                        </div>
                      </div>
                    </form>
                </div>
              </> */}
            

              {/* COMMENTS SECTION */}
              <form onSubmit={submitHandleEdit} >
                <div className='grid grid-cols-3'>
                  <div className='col-span-2'>

                    <h3>Reviews</h3>
                    { reviews.length > 0
                        &&
                        reviews.map(review => {
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
              { errors ? <h2>Something went wrong.</h2> : <p>Loading</p>}
            </h2> 
          }
          <form onSubmit={handleAddComment}>
            <div className='mb-4 w-1/2 h-1/2 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 pt-2'>
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
        </Row>
      </Container>
    </>
  )
}

export default LocationSingle


