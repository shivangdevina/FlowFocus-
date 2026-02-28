from fastapi import FastAPI , Request , Response
from fastapi.middleware.cors import CORSMiddleware
import uvicorn 
from routers import database
from core.database import supabase

app = FastAPI()

origins = [
    "http://localhost",
    "http://127.0.0.1",
]


app.add_middleware(
   CORSMiddleware,
   allow_origins = origins,
   allow_credentials = True,
   allow_methods = ["*"],
   allow_headers=["*"],
)

app.include_router(database.router)
##app.include_router(auth_router)

@app.get("/health")
async def health_check():
    return {"message":"health is fine"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0" , port=8000)