import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_hello_endpoint():
    """Test the hello endpoint"""
    response = client.get("/hello")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Hello, World!"
    assert data["status"] == "success"

def test_echo_endpoint():
    """Test the echo endpoint"""
    test_message = "Hello from test!"
    response = client.post("/echo", json={"message": test_message})
    assert response.status_code == 200
    data = response.json()
    assert data["echo"] == test_message
    assert data["status"] == "success"

def test_sum_endpoint():
    """Test the sum endpoint"""
    test_numbers = [1, 2, 3, 4, 5]
    response = client.post("/sum", json={"numbers": test_numbers})
    assert response.status_code == 200
    data = response.json()
    assert data["sum"] == 15
    assert data["count"] == 5
    assert data["numbers"] == test_numbers
    assert data["status"] == "success"

def test_sum_endpoint_empty():
    """Test the sum endpoint with empty numbers"""
    response = client.post("/sum", json={"numbers": []})
    assert response.status_code == 400
    data = response.json()
    assert "No numbers provided" in data["detail"]

def test_health_endpoint():
    """Test the health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "minimal-fastapi"

def test_ui_endpoint():
    """Test the UI endpoint returns HTML"""
    response = client.get("/")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "FastAPI Service Dashboard" in response.text

if __name__ == "__main__":
    pytest.main([__file__])
