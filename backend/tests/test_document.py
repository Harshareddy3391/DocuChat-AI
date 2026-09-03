import sys

sys.path.insert(0, "/app")

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_get_documents_requires_authentication():
    response = client.get("/documents")

    assert response.status_code in [401, 403]