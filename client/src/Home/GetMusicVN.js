import { useEffect } from 'react'
import axios from 'axios'

export default function GetMusicVN() {
    const endpoint = 'https://api.spotify.com/v1/browse/categories/party'
    const handler = ()=>{
        axios.get(endpoint, {
            'Content-Type': 'application/json',
            'Authorization': '',
            'Host': 'api.spotify.com'
        })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }
    

  return (
    <div>
        <button onClick={handler}>Get data</button>
    </div>
  )
}
