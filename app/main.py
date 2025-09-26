from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI(title="Minimal FastAPI Service", version="1.0.0")

# Mount static files for the UI
app.mount("/static", StaticFiles(directory="static"), name="static")

class EchoRequest(BaseModel):
    message: str

class SumRequest(BaseModel):
    numbers: List[float]

@app.get("/", response_class=HTMLResponse)
async def serve_ui():
    """Serve the main UI"""
    with open("static/index.html", "r") as f:
        return HTMLResponse(content=f.read())

@app.get("/hello")
async def hello():
    """Hello endpoint"""
    return {"message": "Hello, World!", "status": "success"}

@app.post("/echo")
async def echo(request: EchoRequest):
    """Echo endpoint that returns the received message"""
    return {"echo": request.message, "status": "success"}

@app.post("/sum")
async def sum_numbers(request: SumRequest):
    """Sum endpoint that adds all provided numbers"""
    if not request.numbers:
        raise HTTPException(status_code=400, detail="No numbers provided")
    
    result = sum(request.numbers)
    return {
        "numbers": request.numbers,
        "sum": result,
        "count": len(request.numbers),
        "status": "success"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "minimal-fastapi"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
