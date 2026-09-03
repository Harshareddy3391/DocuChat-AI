"""from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_auth_router_exists():
    response = client.get("/docs")
    assert response.status_code == 200"""

import sys

sys.path.insert(0, "/app")

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_auth_router_exists():
    response = client.get("/docs")

    assert response.status_code == 200