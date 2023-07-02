import React from 'react'
import {Box, Grid, Button, ButtonGroup, Typography} from '@mui/material'
import {Link, Navigate} from 'react-router-dom'
import {useEffect, useState} from 'react'

const HomePage = () => {
  const [roomCode, setRoomCode] = useState(null)
  const [isPending, setIsPending] = useState(true)
  useEffect(() => {
    async function autoEnter() {
      fetch('/api/user-in-room')
        .then(response => response.json())
        .then(data => {
          setRoomCode(data.code)
          setIsPending(false)
        })
    }
    autoEnter()
  }, [])
  return roomCode ? (
    <>
      !isPending && <Navigate to={`/room/${roomCode}`} replace={true} />
    </>
  ) : (
    !isPending && (
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={3}>
          <Grid item xs={12} align='center'>
            <Typography variant='h3' component='h3'>
              House Party
            </Typography>
          </Grid>
          <Grid item xs={12} align='center'>
            <ButtonGroup disableElevation variant='contained'>
              <Button color='primary' to='/join' component={Link}>
                Join a Room
              </Button>
              <Button color='secondary' to='/create' component={Link}>
                Create a Room
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    )
  )
}

export default HomePage
