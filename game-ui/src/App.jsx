import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import SignInButton from './components/SignInButton';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const { accounts, inProgress } = useMsal();
  const [refresh, setRefresh] = useState(false);
  const username = accounts[0]?.username || null;

  const triggerRefresh = () => setRefresh(!refresh);

  useEffect(() => {
    if (inProgress === "none" && !username) {
      console.warn("Aucun utilisateur connecté après redirection.");
    }
  }, [inProgress, username]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>
      <h1>Rock, Paper, Scissors</h1>
      {!username ? (
        <SignInButton />
      ) : (
        <>
          <p>Bienvenue, <strong>{username}</strong></p>
          <Game player={username} onWin={triggerRefresh} />
          <Leaderboard refresh={refresh} />
        </>
      )}
    </div>
  );
}

export default App;
