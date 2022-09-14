import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Container, Row, Col, Card } from 'react-bootstrap'



const LocationIndex = () => {
  const [locations, setLocations] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/locations')

        setLocations(data)
        // console.log(data)
      } catch (error) {
        // setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])
  
  return (
    <>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Welcome!
        </p>
        <p className="text-gray-500 text-lg">
          Locations Index
        </p>
      </div>
      <Container as='main'>
        <h1>Locations</h1>
        <Row>
          {locations.length > 0 ?
            <>
              {locations.map(location => {
                const { id } = location
                return (
                  <Col className="mb-4" md='3' key={id}>
                    <Link className="mb-4" to={`/locations/${id}`}>
                      <Card className='locations-card hover:grid'>
                        <Card.Img variant='top' className='w-100' src={location.location_image_1}></Card.Img>
                        <Card.Body><Card.Title>{location.name}</Card.Title> {location.trivia} - {location.trivia} </Card.Body>
                        <p><img src={location.inhabitants[0].image1} /> - {location.inhabitants[0].about}</p>
                      </Card>
                    </Link>
                  </Col>
                )
              })}
            </>
            :
            <h1>
              {/* {error ? <img src={errorImg} /> : <img src={spinnerImg} />} */}
              {error ? 'no comments' : 'loading'}
            </h1>
          }

        </Row>
      </Container >
    </>
  )
}
export default LocationIndex