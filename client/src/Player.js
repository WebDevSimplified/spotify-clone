import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"
import { lightThemePlayer } from "./theme/lightTheme"
import { darkThemePlayer } from "./theme/darkTheme"

export default function Player({ accessToken, trackUri, theme }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      key={theme.name}
      styles={theme.name === "dark" ? { ...darkThemePlayer } : { ...lightThemePlayer }}
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  )
}
