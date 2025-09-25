# Minimal FastAPI Service

A minimal FastAPI service with a modern, professional UI for testing API endpoints.

## Features

- **Hello Endpoint** (`/hello`): Returns a simple greeting
- **Echo Endpoint** (`/echo`): POST endpoint that echoes back the received message
- **Sum Endpoint** (`/sum`): POST endpoint that calculates the sum of provided numbers
- **Health Check** (`/health`): Health monitoring endpoint
- **Modern UI** (`/`): Interactive web interface for testing all endpoints

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Service

Start the FastAPI server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The service will be available at:
- UI: http://localhost:8000
- API: http://localhost:8000/hello, /echo, /sum, /health
- API Documentation: http://localhost:8000/docs

## Testing

Run the test suite:
```bash
pytest test_main.py -v
```

## API Endpoints

### GET /hello
Returns a hello message.

**Response:**
```json
{
  "message": "Hello, World!",
  "status": "success"
}
```

### POST /echo
Echoes back the received message.

**Request:**
```json
{
  "message": "Hello, World!"
}
```

**Response:**
```json
{
  "echo": "Hello, World!",
  "status": "success"
}
```

### POST /sum
Calculates the sum of provided numbers.

**Request:**
```json
{
  "numbers": [1, 2, 3, 4, 5]
}
```

**Response:**
```json
{
  "numbers": [1, 2, 3, 4, 5],
  "sum": 15,
  "count": 5,
  "status": "success"
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "minimal-fastapi"
}
```

## UI Features

The modern web interface includes:
- Responsive design that works on desktop and mobile
- Interactive testing of all API endpoints
- Real-time results display
- Loading states and error handling
- Professional gradient design with smooth animations

## Project Structure

```
fastapi-service/
├── main.py              # FastAPI application
├── test_main.py         # Test suite
├── requirements.txt     # Python dependencies
├── README.md           # This file
└── static/             # Static files for UI
    ├── index.html      # Main UI page
    ├── style.css       # Styling
    └── script.js       # JavaScript functionality
```
