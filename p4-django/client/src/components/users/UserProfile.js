import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getToken } from '../../auth/auth'



const UserProfile = () => {

  const { userId } = useParams()

  const [ profile, setProfile ] = useState([])
  const [ error, setError ] = useState(false)
  const [ updatedUserProfile, setUpdatedUserProfile ] = useState([])
  const [ newProfileImg, setNewProfileImg ] = useState([])


  useEffect(() => {

    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        setProfile(data)
        console.log('data from profile ---->', data)
        console.log('data from user profile----.>', data.profile_image)
      } catch (error) {
        setError(error)
        console.log('error', error)
      }
    }

    getProfile()
  }, [])


  


  return (
    <section className='pt-16 bg-blueGray-50'>
      <div className='w-full lg:w-4/12 px-4 mx-auto'>
        { profile ? 
          <>
          
            <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16'>
              <div className='px-6'>
                <div className='flex flex-wrap justify-center'>
                  <div className='w-full px-4 flex justify-center'>
                    <div className='relative'>
                      {/* <div><img src={profile.profile_image}/></div> */}
                      <img className='shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px' src={profile.profile_image} alt='profile image' />
                    </div>
                  </div>
                </div>
                <div className='text-center mt-12'>
                  <h3 className='text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2'>
                    {profile.username}
                  </h3>
                  <div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase'>
                    <i className='fas fa-map-marker-alt mr-2 text-lg text-blueGray-400'></i>
                    {profile.email}
                  </div>
                  <div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase'>
                    <i className='fas fa-map-marker-alt mr-2 text-lg text-blueGray-400'></i>
                    {profile.likes}
                  </div>
                  <button className='btn btn-danger'>
                    <Link to='/editProfile'>Edit Profile</Link>
                  </button>
                </div>
              </div>
            </div>

          </>
          :
          <h2 className='text-center'>
            {error ? 'no comments' : 'loading'}
          </h2>
        }
      </div>
    </section>
  )
}


export default UserProfile