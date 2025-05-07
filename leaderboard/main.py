from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import os
import redis

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["http://localhost:8080"] pour plus de sécurité
    allow_methods=["*"],
    allow_headers=["*"],
)
# Connexion Redis
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")

r = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=REDIS_PASSWORD,
    decode_responses=True  # pour avoir des strings en retour
)

class ScoreInput(BaseModel):
    player: str
    result: str  # "win", "lose", "draw"

class ScoreOutput(BaseModel):
    player: str
    score: int

@app.post("/score")
async def submit_score(data: ScoreInput):
    if data.result == "win":
        r.incr(f"score:{data.player}")
    return {"message": "Score enregistré"}

@app.get("/top", response_model=List[ScoreOutput])
async def get_top_scores():
    # Cherche toutes les clés qui ressemblent à "score:*"
    keys = r.keys("score:*")
    if not keys:
        return []

    # Récupère toutes les valeurs et construit la liste
    scores = [(key.split(":")[1], int(r.get(key))) for key in keys]
    top = sorted(scores, key=lambda x: x[1], reverse=True)[:10]
    return [{"player": k, "score": v} for k, v in top]
