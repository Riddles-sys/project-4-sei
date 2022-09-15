import { Link } from 'react-router-dom'
import mainImage from '../images/hobbit-home.gif'

const Landing = () => {
  return (
    <section className='landing-page'>
      <div className="container mx-auto bg-transparent rounded-xl shadow border p-10">
        <div>
          <div className='entry'>
            <h1 className="text-3xl text-gray-700 font-bold mb-5">
              Welcome to Middle Earth Tours
            </h1>
          </div>
          <div className='enter'>
            <p> Where adventure awaits.</p>
          </div>
          
        </div>
        <div className='enter-button'>
          <img src={mainImage} alt='opening door gif' />
          <button className='landing-btn btn btn-success'><Link to='/locations'>Discover</Link></button>
        </div>
      </div>
    </section>
  )
}
export default Landing

// import onemap from '../images/1-Map-of-the-pealms-of-Middle-Earth-illustrated-by-studio-MUTI.jpg'


// <img className='main-map w-100' src={onemap} useMap="#image-map"/>

// <map name="image-map">
//   <area target="" alt="The Shire" title="The Shire" href="http://localhost:3000/locations/2/" coords="72,191,227,94" shape="rect"/>
// </map>