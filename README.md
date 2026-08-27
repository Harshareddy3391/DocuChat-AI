# DocuChat AI

DocuChat AI is an AI-powered document analysis and chat platform. Users can log in using Google OAuth, upload PDF documents, extract and chunk text content, store the generated OpenAI vector embeddings in Supabase PostgreSQL with `pgvector`, and ask questions to get context-retrieved RAG answers powered by OpenAI's `gpt-4o-mini` model.

---

## 🏗️ Architecture Overview

The system consists of the following components:

- **Frontend**: React (Vite) + Tailwind CSS + Axios. Set up as a Single Page Application and served via Nginx. Exposed at `http://localhost:3000`.
- **Backend**: FastAPI + Uvicorn. Exposes REST API endpoints for document management, authentication callbacks, and RAG chat sessions. Exposed at `http://localhost:8000`.
- **Database**: Supabase PostgreSQL with the `pgvector` extension enabled for storing document chunks and vector embeddings.
- **Storage**: Supabase Storage private bucket (`documents`) for secure PDF uploads.
- **Authentication**: JWT-based security with Google OAuth 2.0 redirection and state verification.
- **AI Core**: OpenAI `text-embedding-3-small` (1536-dimensional embeddings) and `gpt-4o-mini` for chat generation.

---

## 🛠️ Environment Setup

To run the application, copy the environment variable template:

```bash
cp .env.example backend/.env
```

And configure the following variables inside `backend/.env`:

### Database Settings
* `DATABASE_URL`: Connection string with `postgresql+psycopg2://` driver.
* `DIRECT_URL`: Connection string used for direct database migrations.

### Google OAuth Credentials
* `GOOGLE_CLIENT_ID`: Google Cloud Console Web Application ID.
* `GOOGLE_CLIENT_SECRET`: Google Cloud Console Secret Key.
* `GOOGLE_REDIRECT_URI`: OAuth callback route (e.g. `http://localhost:8000/auth/google/callback`).

### JWT settings
* `JWT_SECRET_KEY`: A secure key used for signing JWTs.
* `JWT_ALGORITHM`: The algorithm used for signing (e.g. `HS256`).
* `ACCESS_TOCKEN_EXPIRE_MINUTES`: JWT token lifespan (e.g. `60`).

### Supabase Storage
* `SUPABASE_URL`: Supabase project URL.
* `SUPABASE_KEY`: Supabase service role secret key.
* `SUPABASE_BUCKET`: Storage bucket name (e.g., `documents`).

### OpenAI API Key
* `OPENAI_API_KEY`: API Key for embeddings and completion.

### Frontend Integration
* `FRONTEND_URL`: URL where the frontend is served (e.g. `http://localhost:3000`).

---

## 🚀 Running the Project (Docker Compose)

The application is fully containerized. To build and start both the backend and frontend services:

```bash
# Start containers in detached mode and rebuild images
docker compose up -d --build

# View container logs
docker compose logs -f

# View logs for a specific service
docker compose logs -f backend

# Stop the containers
docker compose down
```

The frontend will be available at `http://localhost:3000` and the backend FastAPI docs at `http://localhost:8000/docs`.

---

## 🔑 Database and Supabase Setup

### PostgreSQL pgvector Extension
Verify that the `vector` extension is enabled in your database:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### Supabase Storage Bucket
Create a private bucket named `documents` in your Supabase project under Storage.

---

## 📡 API Usage & Endpoints

### 1. Authentication
* `GET /auth/google/login`: Redirects to Google OAuth screen.
* `GET /auth/google/callback`: Receives Google code, generates local user in DB, and redirects user to frontend with JWT token in query string.

### 2. Document Management
* `POST /documents/upload` [Protected]: Uploads PDF, extracts text, generates embeddings, stores vectors in DB.
* `GET /documents` [Protected]: Lists all documents uploaded by the user with signed URLs.
* `DELETE /documents/{document_id}` [Protected]: Deletes document metadata, database chunks, and PDF from storage.

### 3. RAG Chat
* `POST /chat/` [Protected]: Performs similarity search on document chunks and generates context-grounded response. Body: `{"document_id": int, "question": "string"}`.

---

## ⚙️ Troubleshooting & Verification

### Run End-to-End Tests
You can run automated integration tests to verify the entire pipeline (PDF storage, text extraction, RAG similarity search, OpenAI answers, and cascades deletion) using Python:

```bash
# Make sure you are in the backend directory
cd backend

# Execute test script
projectvenv/Scripts/python C:/Users/dell/.gemini/antigravity/brain/2d0f1d64-86ad-453a-b495-1305561ec33e/scratch/e2e_test.py
```

### Known Limitations
* **Scanned PDFs**: Only text-based PDFs are supported. Image-only scanned PDFs will raise a validation error as no extractable text is detected.
* **Large Files**: PDF processing is synchronous during upload. Large files (>20MB) may take longer to process and embed.