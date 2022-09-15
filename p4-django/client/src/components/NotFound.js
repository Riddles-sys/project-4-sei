import { Link } from 'react-router-dom'
import notfound from '../images/notfound-removebg-preview.png'

const NotFound = () => {
  return (
    <div className='notfound'>
      
      <Link to='/'><img src={notfound} alt='not found'/></Link>
    </div>
  )
}

export default NotFound