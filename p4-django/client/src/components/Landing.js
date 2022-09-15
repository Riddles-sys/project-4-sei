import { Link } from 'react-router-dom'
import mainImage from '../images/hobbit-home.gif'

const Landing = () => {
  return (
    <section className='landing-page'>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <div>
          <div>
            <h1 className="text-3xl text-gray-700 font-bold mb-5">
              Welcome to Middle Earth Tours
            </h1>
          </div>
          <div>
            <p> Where adventure awaits.</p>
            
            <button className='btn btn-warning'><Link to='/locations'>Discover</Link></button>
          </div>
        </div>
        <img src={mainImage} alt='opening door gif' />

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