import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getText } from '../../auth/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const [error, setError] = useState()

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {

      const { data } = await axios.post('api/auth/login/', loginData)
      getText(data.message)
      console.log('res-->', data.message)
      setError(null)
      const { token } = data
      localStorage.setItem('r42', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      navigate('/')
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      console.log(error)
      toast.error(error.data.message, {
        position: 'top-center',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <Container className="form-wrapper min-vh-100">
      <ToastContainer />
      {/* <Row> */}
      <form onSubmit={onSubmit} className="justify-content-between">
        <h3 className="text-center">Login</h3>

        {/* UserName */}
        <Row>
          <label htmlFor="email">email</label>
          <input
            onInput={handleChange}
            type="text"
            name="email"
            placeholder="Username"
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
            placeholder="Password"
            required
          />
        </Row>
        {/* Error Message */}
        {/* <p className='text-danger my-2'>Error Message</p> */}

        {/* Submit */}
        <input type="submit" value="Login" className="btn dark" />
        <p className="text-center mb-0 mt-3">Not yet registered?</p>
        <p className="text-center mb-0">
          <Link to="/register">Register</Link>
        </p>
      </form>
      {/* </Row> */}
    </Container>
  )
}

export default Login
// return (
//   <>
//   <div className="w-full max-w-xs">
//     <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//           Username
//         </label>
//         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onInput={handleChange} id="username" type="text" placeholder="Username"/>
//       </div>
//       <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//           Password
//         </label>
//         <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onInput={handleChange} id="password" type="password" placeholder="******************"/>
//         <p className="text-red-500 text-xs italic">Please choose a password.</p>
//       </div>
//       <div className="flex items-center justify-between">
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
//           Sign In
//         </button>
//         <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
//           Forgot Password?
//         </a>
//       </div>
//     </form>
//       <p className="text-center text-gray-500 text-xs">
//       &copy;2020 Acme Corp. All rights reserved.
//       </p>
//     </div>
//   </>
// )