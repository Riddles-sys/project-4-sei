import { Link, useNavigate } from 'react-router-dom'
import { userIsAuthenticated, loginTextDisplay } from '../../auth/auth.js'
import { useParams } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'

const PageNavBar = () => {
  const navigate = useNavigate()


  const handleLogout = () => {
    window.localStorage.removeItem('r42')
    toast.info('Goodbye! :(', {
      position: 'top-left',
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    navigate('/')
    console.log('USER HAS LOGGED OUT')
  }

  return (
    <NavBar className='nav' expand='md'>
      <ToastContainer />
      <Container>
        <NavBar.Brand as={Link} to='/'>
          <span className='logo fw-bold'>Middle Earth Tours</span>
        </NavBar.Brand>
        {userIsAuthenticated() && loginTextDisplay()}
        <NavBar.Toggle aria-controls='basic-navbar-nav'></NavBar.Toggle>
        <NavBar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          {userIsAuthenticated() ? (
            <>
              <Nav.Link as={Link} to='/'>
                <span className='ms-3'>Home</span>
              </Nav.Link>
              <Nav.Link as={Link} to='/locations'>
                <span className='ms-3'>Locations</span>
              </Nav.Link>
              <Nav.Link as={Link} to='/profile/'>
                <span className='ms-3'>Profile</span>
              </Nav.Link>
              <Nav.Link as={Link} to='/maps'>
                <span className='ms-3'>Maps</span>
              </Nav.Link>
              <Nav.Link onClick={handleLogout} as={Link} to='/'>
                <span className='ms-3'>Logout</span>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to='/locations'>
                <span className='ms-3'>Locations</span>
              </Nav.Link>
              <Nav.Link as={Link} to='/maps'>
                <span className='ms-3'>Maps</span>
              </Nav.Link>
              <Nav.Link as={Link} to='/register' className=' ms-3'>
                <span className=''>Register</span>
              </Nav.Link>
              <Nav.Link as={Link} to='/login' className=' ms-3'>
                <span className=''>Login</span>
              </Nav.Link>
            </>
          )}
        </NavBar.Collapse>
      </Container>
    </NavBar>
  )
}

export default PageNavBar
