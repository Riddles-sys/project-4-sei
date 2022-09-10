import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Register = () => {
  const navigate = useNavigate()
  //! State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    name: { message: '' },
    email: { message: '' },
    userName: { message: '' },
    password: { message: '' },
    confirmPassword: { message: '' },
  })

  //! Functions
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post('/api/register/', formData)
      setTokenToLocalStorage(res.data.token)
      // navigate('/login')
      console.log(formData)
    } catch (error) {
      toast.error(error.response.data.message, {
        position: 'top-center',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      console.log('error ->', error.response.data.errors)
      if (error.response.data.errors) setErrors(error.response.data.errors)
    }
  }

  return (
    <Container className="form-wrapper min-vh-100">
      <ToastContainer />
      {/* <Row> */}
      <form onSubmit={handleSubmit} className="justify-content-between">
        <h3 className="text-center">Register</h3>
        <Row>
          <label htmlFor="name">Name</label>
          <input
            onInput={handleChange}
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            required
          />
        </Row>
        {/* Email */}
        <Row>
          <label htmlFor="userName">Username</label>
          <input
            onInput={handleChange}
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            required
          />
        </Row>

        {/* Email */}
        <Row>
          <label htmlFor="email">Email</label>
          <input
            onInput={handleChange}
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            required
          />
        </Row>
        {/* Password */}
        <Row>
          <label htmlFor="password">Password</label>
          <input
            onInput={handleChange}
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            required
          />
        </Row>

        {/* Confirm Password */}
        <Row>
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input
            onInput={handleChange}
            type="password"
            name="password_confirmation"
            value={formData.confirm}
            placeholder="Confirm Password"
            required
          />
        </Row>
        {/* Error Message */}
        {/* <p className='text-danger my-2'>Error Message</p> */}

        {/* Submit */}
        <input type="submit" value="Register" className="btn dark" />
        <p className="text-center mb-0 mt-3">Already signed in?</p>
        <p className="text-center mb-0">
          <Link to="/login">Login</Link>
        </p>
      </form>
      {/* </Row> */}
    </Container>
  )
}

export default Register
