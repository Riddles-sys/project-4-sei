import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const LocationSingle = () => {
  const { locationId } = useParams()

  const [locations, setLocations] = useState([])
  const [error, setError] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/locations/${locationId}`)
        setLocations(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [locationId])


  return (
    <Container as="main">
      <Row>
        { locations ? 
          // If bread is truthy, then our API call was successful as data has been added to the bread state
          <>
            <h1>{locations.name}</h1>
            <Col md="6">
              <img className='w-100' src={locations.location_images} alt={locations.name} />
            </Col>
            <Col md="6">
              {/* Description */}
              <h2><span>🍽</span> Description</h2>
              <p>{locations.about}</p>
              <hr />
              {/* Origin */}
              <h2><span>🌍</span> Origin</h2>
              <p>{locations.origin}</p>
              <hr />
              {/* Added by */}
              <h2><span>👤</span> Added by</h2>
              <p>{locations.history}</p>
              <hr />
              <Link to="/bread" className='btn dark'>Back to all bread</Link>
            </Col>
          </>
          :
          <h2 className="text-center">
            Something went wrong. Please try again later
          </h2>
        }
      </Row>
    </Container>
  )   
}

export default LocationSingle