import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Box, Button, Grid, Typography} from '@mui/material'
import RoomCreatePage from './RoomCreatePage'
import MusicPlayer from './MusicPlayer'

const Room = () => {
  const [votesToSkip, setVotesToSkip] = useState(2)
  const [guestCanPause, setGuestCanPause] = useState(false)
  const [isHost, setIsHost] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false)
  const [song, setSong] = useState({})
  const {roomCode} = useParams()
  const navigate = useNavigate()

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    }
    fetch('/api/leave-room', requestOptions).then(response => {
      navigate('/')
    })
  }

  const authenticateSpotify = () => {
    fetch('/spotify/is-authenticated')
      .then(response => response.json())
      .then(data => {
        setSpotifyAuthenticated(data.status)
        if (!data.status) {
          fetch('/spotify/get-auth-url')
            .then(response => response.json())
            .then(data => {
              window.location.replace(data.url)
            })
        }
      })
  }
  const getRoomDetails = () => {
    fetch(`/api/get-room?code=${roomCode}`)
      .then(response => {
        if (!response.ok) {
          navigate('/')
        }
        return response.json()
      })
      .then(data => {
        setVotesToSkip(data.votes_to_skip)
        setGuestCanPause(data.guest_can_pause)
        setIsHost(data.is_host)
        if (isHost) {
          authenticateSpotify()
        }
      })
  }

  const renderSettings = () => {
    return (
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={1}>
          <Grid item xs={12} align='center'>
            <RoomCreatePage
              update={true}
              votesToSkip={votesToSkip}
              guestCanPause={guestCanPause}
              roomCode={roomCode}
            ></RoomCreatePage>
          </Grid>
          <Grid item xs={12} align='center'>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => setShowSettings(false)}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
  }
  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align='center'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    )
  }

  const getCurrentSong = () => {
    fetch('/spotify/current-song')
      .then(response => {
        if (!response.ok) {
          return {}
        }
        return response.json()
      })
      .then(data => {
        setSong(data)
      })
  }
  useEffect(() => {
    const interval = setInterval(getCurrentSong, 1000)
    ;() => clearInterval(interval)
  }, [])

  getRoomDetails()

  return showSettings ? (
    renderSettings()
  ) : (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <Typography variant='h3' component='h3'>
            Code: {roomCode}
          </Typography>
        </Grid>
        <MusicPlayer {...song} />
        {isHost && renderSettingsButton()}
        <Grid item xs={12} align='center'>
          <Button
            color='secondary'
            variant='contained'
            onClick={leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Room
