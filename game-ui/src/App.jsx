import React, { useState } from 'react';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="App">
      <h1>Rock, Paper, Scissors</h1>
      <Game onWin={() => setRefresh(prev => !prev)} />
      <Leaderboard refresh={refresh} />
    </div>
  );
}

export default App;
