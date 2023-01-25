import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { Error, Loader, SongCard } from '../components'
import { countries } from '../assets/constants'

import { useGetSongsByListIdQuery } from '../redux/services/shazam'
import { GEO_IPIFY_API_KEY } from '../redux/services/keys'


const Discover = () => {

  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(true)
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  useEffect(() => {
    axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${GEO_IPIFY_API_KEY}`)
      .then((res) => setCountry(countries.find(element => element.id == res?.data?.location?.country)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [country])

  const { data, isFetching, error } = useGetSongsByListIdQuery(country.listid)

  
  if (isFetching || loading) return <Loader title='Loading songs...' />
  if (error || !country) return <Error />


  return(
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
        
        <h2 className='font-bold text-3xl text-white text-left'>
          Discover Top {country.name} Songs
        </h2>
      </div>

      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data.tracks.map((song, i) => (
          <SongCard 
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data = {data.tracks}
            i={i}
          />
        ))}      
      </div>

    </div>
  )
}

export default Discover;
