import React from 'react';
import HomePage from './HomePage';
import RoomCreatePage from './RoomCreatePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoomJoinPage from './RoomJoinPage';
import Room from './Room';

const App = () => {
    return (
        <div className="center">
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<RoomCreatePage />} />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/room/:roomCode" element={<Room />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
