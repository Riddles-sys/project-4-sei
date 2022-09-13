import onemap from '../images/1-Map-of-the-pealms-of-Middle-Earth-illustrated-by-studio-MUTI.jpg'


const Landing = () => {
  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">
        Welcome!
      </p>
      <img className='w-100' src={onemap} useMap="#image-map"/>

      <map name="image-map">
        <area target="" alt="The Shire" title="The Shire" href="http://localhost:3000/locations/1" coords="72,191,227,94" shape="rect"/>
      </map>
    </div>
  )
}
export default Landing