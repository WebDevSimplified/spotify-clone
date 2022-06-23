import {spotifyApi} from '../../spotify/spotifyApi'
import Cookies from 'js-cookie'

function VnTest() {
    const accessToken = Cookies.get('accessToken')
    spotifyApi.setAccessToken(accessToken)
    // new release nhạc việt
    // spotifyApi.getNewReleases({ limit : 5, offset: 0, country: 'VN' })
    // .then(res=>console.log(res.body))
    // .catch(err => console.error(err))

    // nhạc pop việt nam
    // spotifyApi.getPlaylistsForCategory('pop', {
    //     country: 'VN',
    //     limit : 2,
    //     offset : 0
    //   })
    // .then(function(data) {
    //   console.log(data.body);
    // }, function(err) {
    //   console.log("Something went wrong!", err);
    // });

    // Vietnam recommendation
    // spotifyApi.getRecommendations({
    //     min_energy: 0.4,
    //     seed_artists: ['5FWPIKz9czXWaiNtw45KQs', '3swW6OR2g7qTY3626sqVW4'],
    //     min_popularity: 50
    //   })
    // .then(function(data) {
    //   let recommendations = data.body;
    //   console.log(recommendations);
    // }, function(err) {
    //   console.log("Something went wrong!", err);
    // });

    // Đàm Vĩnh Hưng
    // spotifyApi
    // .getArtistAlbums('4ht0wODL01ELRxlDYvsFad', { limit: 10 })
    // .then(res=>console.log(res.body))
    
  return (
    <div>
        
    </div>
  )
}

export default VnTest