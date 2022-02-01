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

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  function People() {
    const [active, setActive] = useState(types[0]);
    return (
      <>
        <div>
          {types.map((type) => (
            <button
              key={type}
              active={active === type}
              onClick={() => setActive(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <p />
        <p> Current Selection:  {active} </p>
      </>
    );
  }
  // const types = ["Cash", "Credit", "Debit"]
  const types = ["Avishek Khan", "Jeremy Morgan", "Andrew Oliver", "Grace Carlson", "Andrea Chalem", "Liz Krogman","Milla Shin", "Dima Fayyad", "Sammy Archer"];
  
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
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <h1> Happy Birthday Alice!</h1>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <People> </People>
      
        {/* <button className="btn btn-success btn-lg" onChange={selectUser}>
        Avishek Khan
      </button>
      <button className="btn btn-success btn-lg">
        Jeremy Morgan
      </button>
      <button className="btn btn-success btn-lg">
        MacKenzi Simpson
      </button>
            <button className="btn btn-success btn-lg">
        Sammy Archer
      </button>
      <button className="btn btn-success btn-lg">
        Andrew Oliver
      </button>
      <button className="btn btn-success btn-lg">
        Dima Fayyad
      </button>
      <button className="btn btn-success btn-lg">
        Liz Krogman
      </button>
      <button className="btn btn-success btn-lg">
        Grace Carlson
      </button>
      <button className="btn btn-success btn-lg">
        Andrea Chalem
      </button>
      <button className="btn btn-success btn-lg">
        Milla Shin
      </button> */}

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
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  )
}
