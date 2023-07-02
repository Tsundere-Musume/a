import React from 'react';
import { TextField, Box, Button, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RoomJoinPage = () => {
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value);
    };

    const handleRoomButtonPressed = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: roomCode,
            }),
        };
        fetch('/api/join-room', requestOptions)
            .then((response) => {
                if (response.ok) {
                    navigate(`/room/${roomCode}`);
                }
                setError('Room Not found');
            })
            .catch((error) => console.error(error));
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Join a room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        error={error}
                        label="Code"
                        placeholder="Enter a room code"
                        value={roomCode}
                        helperText={error}
                        variant="outlined"
                        onChange={handleTextFieldChange}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRoomButtonPressed}
                    >
                        Enter room{' '}
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        to="/"
                        component={Link}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RoomJoinPage;
