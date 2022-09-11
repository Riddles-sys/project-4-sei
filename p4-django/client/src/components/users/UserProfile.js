import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getToken } from '../../auth/auth'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const UserProfile = () => {

  const { userId } = useParams()

  const [ profile, setProfile ] = useState({})
  // const [ location, setLocation ] = useState([])
  const [ error, setError ] = useState(false)


  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/location/')
  //       setLocation(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getData()
  // }, [setLocation])

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: { Authorization: `Bearer ${getToken()}` },
        })

        setProfile(data)
        console.log('dataaaa----.>', data)
      } catch (error) {
        console.log(error)
      }
    }
    getProfile()
  }, [])




  return (
    <Container as="main">
      <Row>
        { profile ? 
          <>
            <h1>{profile.username}</h1>
            {/* <Col md="6">
              <img className='w-100' src={profile.location_images} alt={profile.name} />
            </Col> */}
            <Col md="6">
              <h2>Description</h2>
              <p>{profile.email}</p>
              <hr />
              <h2><span>🌍</span> Origin</h2>
              <p>{profile.id}</p>
              {/* <h2>{profile.genres[0].name}</h2> */}
              <hr />
              <h2><span></span> Added by</h2>
              <p>{profile.image}</p>
              <hr />
              {/* <h1>{profile.inhabitants[0].name}</h1> */}
              <Link to="/profile" className='btn dark'>Back to all Home</Link>
            </Col>
          </>
          :
          <h2 className="text-center">
            {error ? 'no comments' : 'loading'}
          </h2>
        }
      </Row>

    </Container>
  )   


}


export default UserProfile