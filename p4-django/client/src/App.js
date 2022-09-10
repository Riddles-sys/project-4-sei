import LocationIndex from './components/LocationIndex'
import Landing from './components/Landing'
import Register from './components/users/Register'
import LocationSingle from './components/LocationSingle'
import PageNavBar from './components/Navigation/PageNavBar'
import Login from './components/users/Login'

import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/locations/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return (
    <div className='container mx-auto'>
      <h1 className="text-3xl font-bold underline">
        Hello world what is up!
      </h1>
      <BrowserRouter>
        <PageNavBar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/locations' element={<LocationIndex />} />
          <Route path='/locations/:locationId' element={<LocationSingle />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
