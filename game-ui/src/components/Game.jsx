import React, { useState } from 'react';
import axios from 'axios';

const choices = ["rock", "paper", "scissors"];

function Game({ player, onWin }) {
  const [result, setResult] = useState(null);

  const play = async (choice) => {
    try {
      const response = await axios.post("/play", {
        player_choice: choice,
        session_id: player || "anonymous"
      });

      setResult(response.data);

      if (response.data.result === "win") {
        await axios.post("/score", {
          player: player || "anonymous",
          result: "win"
        });

        onWin();
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la partie");
    }
  };

  return (
    <div>
      <div>
        {choices.map((choice) => (
          <button key={choice} onClick={() => play(choice)}>
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>Tu as choisi : <strong>{result.player_choice}</strong></p>
          <p>Le bot a choisi : <strong>{result.cpu_choice}</strong></p>
          <p>Résultat : <strong>{result.result.toUpperCase()}</strong></p>
        </div>
      )}
    </div>
  );
}

export default Game;
