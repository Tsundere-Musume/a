import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import {FormHelperText, FormControl, FormControlLabel} from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import {Link} from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Collapse, Alert} from '@mui/material'

const RoomCreatePage = props => {
  const defaultVotes = 2
  const [guestCanPause, setGuestCanPause] = useState(
    props.hasOwnProperty('guestCanPause') ? props.guestCanPause : true,
  )
  const [votesToSkip, setVotesToSkip] = useState(
    props.votesToSkip || defaultVotes,
  )

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleVotesChange = e => {
    setVotesToSkip(e.target.value)
  }

  const handleGuestCanPauseChange = e => {
    setGuestCanPause(e.target.value === 'true' ? true : false)
  }

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    }
    fetch('/api/create-room', requestOptions)
      .then(response => response.json())
      .then(data => navigate(`/room/${data.code}`))
      .catch(err => console.log(err))
  }

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: props.roomCode,
      }),
    }
    fetch('/api/update-room', requestOptions)
      .then(response => {
        if (response.ok) {
          setSuccessMessage('Room updated successfully.')
          setErrorMessage('')
        } else {
          setErrorMessage('Error updating room.')
          setSuccessMessage('')
        }
      })
      .catch(err => console.log(err))
  }
  const renderCreateButtons = () => {
    return (
      <>
        <Grid item xs={12} align='center'>
          <Button
            color='secondary'
            variant='contained'
            onClick={handleRoomButtonPressed}
          >
            Create a room
          </Button>
        </Grid>
        <Grid item xs={12} align='center'>
          <Button color='primary' variant='contained' to='/' component={Link}>
            Back
          </Button>
        </Grid>
      </>
    )
  }

  const renderUpdateButtons = () => {
    return (
      <Grid item xs={12} align='center'>
        <Button
          color='secondary'
          variant='contained'
          onClick={handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid>
    )
  }
  const title = props.update ? 'Update Room' : 'Create a Room'
  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <Collapse in={errorMessage != '' || successMessage != ''}>
            {successMessage != '' && (
              <Alert severity='success' onClose={() => setSuccessMessage('')}>
                {successMessage}
              </Alert>
            )}
            {errorMessage != '' && (
              <Alert severity='error' onClose={() => setErrorMessage('')}>
                {errorMessage}
              </Alert>
            )}
          </Collapse>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant='h4' component='h4'>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <FormControl component='fieldset'>
            <FormHelperText component='div'>
              <div align='center'>Guest control of playback state.</div>
            </FormHelperText>
            <RadioGroup
              row
              value={guestCanPause.toString()}
              onChange={handleGuestCanPauseChange}
            >
              <FormControlLabel
                value='true'
                control={<Radio color='primary' />}
                label='Play/Pause'
                labelPlacement='bottom'
              ></FormControlLabel>
              <FormControlLabel
                value='false'
                control={<Radio color='secondary' />}
                label='No control'
                labelPlacement='bottom'
              ></FormControlLabel>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align='center'>
          <FormControl>
            <TextField
              required={true}
              type='number'
              onChange={handleVotesChange}
              defaultValue={votesToSkip}
              inputProps={{
                min: 1,
                style: {textAlign: 'center'},
              }}
            />
            <FormHelperText component='div'>
              <div align='center'>Votes required to skip song.</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        {props.update ? renderUpdateButtons() : renderCreateButtons()}
      </Grid>
    </Box>
  )
}

export default RoomCreatePage
