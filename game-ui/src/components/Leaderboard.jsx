import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard({ refresh }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get("/top");
        setScores(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du leaderboard :", error);
      }
    };

    fetchScores();
  }, [refresh]);

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>🏆 Leaderboard</h2>
      <table style={{ margin: '0 auto', color: 'white' }}>
        <thead>
          <tr>
            <th>Joueur</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((entry, index) => (
            <tr key={index}>
              <td>{entry.player}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
