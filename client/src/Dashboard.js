import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
  clientId: "87c1e24dd0da4bfead62c866084f725e",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")
  const [mainCharacter, setMainCharacter] = useState("")


  function chooseTrack(track) {
    console.log(track);
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  function selectSongByPerson(person){
    const Avishek_Khan_Song = {artist: 'Two Friends', title: 'Useless', uri: 'spotify:track:3j5ZswTjrNasJnAQOQ1qNU', albumUrl: 'https://i.scdn.co/image/ab67616d0000485116ae2dac30de0d7c925dd179'};
    const Jeremy_Morgan_Song = {artist: 'Just A Gent', title: 'LSD', uri: 'spotify:track:1AiBJB2v6Lp6BiqARZh3R5', albumUrl: 'https://i.scdn.co/image/ab67616d0000485179a24632f09707fac6e89a95'};
    
    const Mr_Brightside = {artist: 'The Killers', title: 'Mr. Brightside', uri: 'spotify:track:7oK9VyNzrYvRFo7nQEYkWN', albumUrl: 'https://i.scdn.co/image/ab67616d0000485156a6d6e493a8f338be63fc49'};
    
    setMainCharacter(person);
    if (person === "Avishek Khan"){
      chooseTrack(Avishek_Khan_Song);
      return
    }
    if (person === "Jeremy Morgan"){
      chooseTrack(Jeremy_Morgan_Song);
      return
    }
    
    chooseTrack(Mr_Brightside);
    return 
  }
  useEffect(() => {
    if (!accessToken) return
    console.log("Main character is: ", mainCharacter);

  }, [mainCharacter]);

  function People() {
    const TwoFriendsSong = {artist: 'Two Friends', title: 'Looking At You (feat. Sam Vesso)', uri: 'spotify:track:2IBzArIJ2ognJz1EZinuPg', albumUrl: 'https://i.scdn.co/image/ab67616d00004851d11eb534eecdcabffd036a01'};
  
    const person = ["Avishek Khan", "Jeremy Morgan", "Andrew Oliver", "Grace Carlson", "Andrea Chalem", "Liz Krogman","Milla Shin", "Dima Fayyad", "Sammy Archer"];
    
    return (
      <>
        <div>
          {person.map((person) => (
            <button
              key={person}
              active={mainCharacter === person}
              onClick={() => selectSongByPerson(person)}
            >
              {person}
            </button>
          ))}
        </div>
        <p />
        <p> Current Selection:  {mainCharacter} </p>
      </>

    );
   

  }
  
  
  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])



  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  return (
    <>
        <People> 
    {/* This prints the people as buttons */}
    </People> 
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <h1> Happy Birthday Alice!</h1>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri } />
      </div>
    </Container>
    </>
  )

}
