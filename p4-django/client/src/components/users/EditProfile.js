import axios from 'axios'
import { useEffect, useState } from 'react'
import { getToken } from '../../auth/auth'
import Container from 'react-bootstrap/Container'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import  Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'



const EditProfile = () => {
  const navigate = useNavigate()
  const [ profile, setProfile ] = useState([])
  const [ userProfile, setUserProfile ] = useState({
    id: '',
    email: '',
    username: '',
    profile_image: 'http://cdn.onlinewebfonts.com/svg/img_568656.png', //! change this
  })

  const [ location, setLocation ] = useState([])
  const [ errors, setErrors ] = useState(false)
  const [ imageSelect, setImageSelected ] = useState('')
  const [ updatedUserProfile, setUpdatedUserProfile ] = useState('')
  const [ newProfileImg, setNewProfileImg ] = useState('')

  const { userId } = useParams()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/',  {
          headers:
          { Authorization: `Bearer ${getToken()}` },
        })
        console.log(data)
        setUserProfile(data)
        console.log('data loading user------->', setUserProfile(data))
        setUpdatedUserProfile(data)
        // !why is it undefined
      } catch (error) {
        console.log(error)
      }
    }
    getProfile()
  }, [])
  

  const uploadImage = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', imageSelect)
    formData.append('upload_preset', 'yfkzazic') 
    const { data } = await axios.post('https://api.cloudinary.com/v1_1/riddles/image/upload', formData)
    setNewProfileImg(data.url)
    console.log('photo data', data)
    setUpdatedUserProfile({ ...updatedUserProfile, profile_image: data.url })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.put(`/api/auth/profile/${userId}/`, updatedUserProfile, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
    
      console.log(data)
      navigate('/profile')
    } catch (error) {
      setErrors(error.message)
      console.log(error.message)
    }
  }

  const handleChange = (event) => {
    setUpdatedUserProfile({ ...updatedUserProfile, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  return (
    <Container className='editUserContainer'>
      { userProfile.email ?
        <>
          <Form onSubmit={handleSubmit} className='edit-user-form'>
            <h1>Name: { userProfile.email ? userProfile.email : userProfile.email}</h1>
            <h2>Profile</h2>
            <Form.Group className='mb-3' >
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' name='username' placeholder='Edit display name' value={updatedUserProfile.username} onChange={handleChange} />
            </Form.Group>
            {/* <Col>
              <img className='w-100' src={userProfile.profile_image} alt={updatedUserProfile.username} />
            </Col> */}
            <hr />
            <Form.Group className='mb-3' >
              <Form.Label>First Name</Form.Label>
              <Form.Control type='text' name='first_name' placeholder='Edit First Name' value={updatedUserProfile.first_name} onChange={handleChange} />
            </Form.Group>
            <hr />
            <Form.Group className='mb-3' >
              <Form.Label>Last Name</Form.Label>
              <Form.Control type='text' name='last_name' placeholder='Edit Last Name' value={updatedUserProfile.last_name} onChange={handleChange} />
            </Form.Group>
            <hr />
            <Form.Group className='mb-3' >
              <Form.Label>Email</Form.Label>
              <Form.Control type='text' name='email' placeholder='Edit Email' value={updatedUserProfile.email} onChange={handleChange} />
            </Form.Group>
            <hr />
            <Form.Group className='mb-3' >
              <Form.Label>Bio</Form.Label>
              <Form.Control type='text' as='textarea' name='bio' placeholder='Edit Bio' value={updatedUserProfile.bio} onChange={handleChange} />
            </Form.Group>
            <hr />
            <Form.Group className='mb-3' >
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handleChange} type='password' name='password' placeholder='Password' value={updatedUserProfile.password}  />
            </Form.Group>
            <Form.Group className='mb-3' >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control onChange={handleChange} type='password' name='password_confirmation' placeholder='Confirm Password' value={updatedUserProfile.password_confirmation} />
            </Form.Group>
            <hr />
            <Form.Group className='mb-3' >
              { newProfileImg ?
                <img className='w-100' src={newProfileImg} alt={'User Uploaded Profile'} />
                :
                <></>
              }
              <Form.Label><h2>Upload Image</h2></Form.Label>
              <Form.Control type='file' id='image' className='input' onChange={(event) => {
                setImageSelected(event.target.files[0])
              }} />
              <button className='btn btn-primary' onClick={uploadImage}>Upload image</button>
            </Form.Group>
            <hr />
            <button className='btn btn-primary' type='submit'>Submit</button>
            <hr />
          </Form>
        </>
        :
        <h2 className='text-center'>
          { errors ? 'Something went wrong. Please try again later' : 'spinner' }
        </h2>
      }
    </Container>
  )
}
export default EditProfile