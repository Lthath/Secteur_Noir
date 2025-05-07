from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import random
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # À restreindre en prod
    allow_methods=["*"],
    allow_headers=["*"],
)

# Choix possibles
CHOICES = ["rock", "paper", "scissors"]

# Modèle d'entrée
class PlayRequest(BaseModel):
    player_choice: str  # doit être dans CHOICES
    session_id: str     # futur support session/cache/SSO

# Modèle de sortie
class PlayResponse(BaseModel):
    player_choice: str
    cpu_choice: str
    result: str  # "win", "lose", "draw"

@app.post("/play", response_model=PlayResponse)
async def play_game(request: PlayRequest):
    player = request.player_choice.lower()
    if player not in CHOICES:
        raise HTTPException(status_code=400, detail="Invalid choice")

    cpu = random.choice(CHOICES)

    # Déterminer le résultat
    if player == cpu:
        result = "draw"
    elif (
        (player == "rock" and cpu == "scissors") or
        (player == "scissors" and cpu == "paper") or
        (player == "paper" and cpu == "rock")
    ):
        result = "win"
    else:
        result = "lose"

    return PlayResponse(player_choice=player, cpu_choice=cpu, result=result)
