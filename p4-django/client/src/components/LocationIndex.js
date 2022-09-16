import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Container, Row, Col, Card } from 'react-bootstrap'
import loaderImg from '../images/loader.gif'


const LocationIndex = () => {
  const [locations, setLocations] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/locations/')

        setLocations(data)
        console.log('error', data.error.message)
        // console.log(data)
      } catch (error) {
        setError(error.message)
        console.log(error)
      }
    }
    getData()
  }, [])
  
  return (
    <>
      {/* <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Welcome!
        </p>
        <p className="text-gray-500 text-lg">
          Locations Index
        </p>
      </div> */}
      <Container as='main' className='landing-index'>
        <h1>Locations</h1>
        <Row>
          {locations.length > 0 ?
            <>
              {locations.map(location => {
                const { id } = location
                return (
                  <Col className="mb-4" md='3' key={id}>
                    <Link className="mb-4" to={`/locations/${id}`}>
                      <Card className='w-100 h-100 locations-card hover:grid'>
                        <Card.Img variant='top' className='w-100' src={location.location_image_1}></Card.Img>
                        <Card.Title>{location.name}</Card.Title>
                      </Card>
                    </Link>
                  </Col>
                )
              })}
            </>
            :
            <h1>
              {/* {error ? <img src={errorImg} /> : <img src={spinnerImg} />} */}
              {error ? 'no comments' : <img src={loaderImg} />}
            </h1>
          }

        </Row>
      </Container >
    </>
  )
}
export default LocationIndex