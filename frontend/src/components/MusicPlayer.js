import React from 'react'
import {
  Box,
  IconButton,
  Grid,
  Typography,
  LinearProgress,
  Card,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';

const MusicPlayer = props => {
  const songProgress = props.time / props.duration * 100
  return (
    <Card>
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={1} alignItems='center'>
          <Grid item align='center' xs={4}>
            <img src={props.image_url} height='100%' width='100%'></img>
          </Grid>
          <Grid item align='center' xs={8}>
            <Typography variant='h5' component='h5'>
              {props.title}
            </Typography>
            <Typography color='textSecondary' variant='subtitle1'>
              {props.artist}
            </Typography>
            <div>
              <IconButton>
                {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton>
                <SkipNextIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Box>
      <LinearProgress variant='determinate' value={songProgress} />
    </Card>
  )
}

export default MusicPlayer
