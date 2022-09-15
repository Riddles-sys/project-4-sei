import LocationIndex from './components/LocationIndex'
import Landing from './components/Landing'
import Register from './components/users/Register'
import LocationSingle from './components/LocationSingle'
import PageNavBar from './components/Navigation/PageNavBar'
import Login from './components/users/Login'
import UserProfile from './components/users/UserProfile'
import EditProfile from './components/users/EditProfile'
import EditReview from './components/EditReview'
import Maps from './components/Maps'
import NewLocation from './components/NewLocation'
import NotFound from './components/NotFound'
import Footer from './components/Footer'

import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/locations/')
      console.log(data)
    }
    getData()
  })

  return (
    // <div className='container'>
    //   <h1 className="text-3xl font-bold underline">
    //     Hello world what is up!
    //   </h1>
    <BrowserRouter>
      <PageNavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/locations' element={<LocationIndex />} />
        <Route path='/locations/:locationId' element={<LocationSingle />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/editProfile/:userId' element={<EditProfile />} />
        <Route path='/edit-review/:locationId/:reviewId' element={<EditReview />} />
        <Route path='/maps' element={<Maps />} />
        <Route path='/new-location' element={<NewLocation />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
