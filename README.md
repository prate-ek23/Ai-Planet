# Ai-Planet File Assistant

A full-stack **RAG (Retrieval-Augmented Generation)** application that lets you upload PDF documents and chat with an AI assistant that answers questions using only the content of your uploaded file. Built with React, FastAPI, LangChain, and Supabase.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing the API](#testing-the-api)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

---

## Features

### Core Features

| Feature | Description |
|--------|-------------|
| **PDF Upload & Parsing** | Upload PDF files; the backend extracts text using PyMuPDF (fitz) and processes them for RAG. |
| **RAG Pipeline** | Documents are split into chunks, embedded with **HuggingFace** (`sentence-transformers/all-mpnet-base-v2`), stored in a **FAISS** vector store, and retrieved when you ask questions. |
| **Chat Interface** | Real-time chat UI: type questions and get answers grounded in your document. Responses are cleaned (e.g. `<think>` blocks and markdown stripped) for a clean display. |
| **Dual Upload Flow** | On upload, the file is both sent to the **FastAPI backend** for RAG indexing and to **Supabase Storage** for persistence in the `file-uploads` bucket. |
| **Context-Only Answers** | The LLM is prompted to answer **only** from the provided context, reducing hallucination. |
| **Loading States** | Full-screen overlay with “Uploading document…” and “Parsing document…” so users know when processing is in progress. |

### Technical Highlights

- **LLM:** **Groq** (`llama-3.1-8b-instant`) for fast inference.
- **Embeddings:** HuggingFace `sentence-transformers/all-mpnet-base-v2` (no API key required for embeddings).
- **Vector Store:** FAISS (in-memory) for fast similarity search.
- **Text Splitting:** LangChain `RecursiveCharacterTextSplitter` (chunk size 1000, overlap 20).
- **Optional Observability:** LangSmith tracing when `LANGCHAIN_TRACING_V2` and `LANGCHAIN_API_KEY` are set.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite 6, React Router 7, Styled Components, Axios |
| **Backend** | FastAPI, Python 3.x, Uvicorn |
| **RAG / NLP** | LangChain, LangChain-Groq, LangChain-HuggingFace, FAISS, Sentence Transformers |
| **PDF** | PyMuPDF (fitz) |
| **Storage** | Supabase (SQL + Storage bucket `file-uploads`) |
| **Dev** | ESLint, dotenv |

---

## Project Structure

```
ai-planet-file-upload-site/
├── public/                 # Static assets (icons, logo)
├── src/
│   ├── backend/            # FastAPI app + RAG logic
│   │   ├── main.py         # API routes: /, /upload/, /chat/
│   │   └── langchain_RAG.py # RAG: embeddings, FAISS, retrieval chain, Groq LLM
│   ├── frontend/
│   │   ├── services/
│   │   │   ├── uploader.js           # Supabase upload + backend /upload/
│   │   │   └── promptResponseHandler.js # Backend /chat/ client
│   │   ├── App.jsx
│   │   ├── ChatContainer.jsx
│   │   ├── ChatInput.jsx
│   │   ├── ChatCard.jsx
│   │   ├── NavBar.jsx
│   │   ├── FileUploaderDialogBox.jsx
│   │   ├── FileName.jsx
│   │   ├── Button.jsx
│   │   └── Spinner.jsx
│   ├── main.jsx
│   ├── index.css
│   └── supabase.js         # Supabase client (uses VITE_* env vars)
├── index.html
├── package.json
├── vite.config.js
├── requirements.txt
└── README.md
```

---

## Prerequisites

- **Node.js** (v18+ recommended) and **npm**
- **Python** 3.10+ and **pip**
- **Supabase** project (for storage and optional DB)
- **Groq** API key ([groq.com](https://console.groq.com))
- **LangSmith** (optional): account and API key for tracing

---

## Environment Variables

### Backend (`.env` in project root or `src/backend/`)

Create a `.env` file where the backend is run (e.g. project root or `src/backend/`):

```env
# Required for RAG + chat
GROQ_API_KEY=your_groq_api_key_here

# Optional: LangSmith tracing
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=your_langsmith_api_key_here
```

### Frontend (`.env` in project root)

Create a `.env` in the project root (same folder as `package.json`) for Vite:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_API_KEY=your_supabase_anon_key_here
```

> **Note:** Do not commit `.env` files. They are listed in `.gitignore`.

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ai-planet-file-upload-site
```

### 2. Backend (Python)

```bash
# Create and use a virtual environment (recommended)
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

# Install dependencies (from project root)
pip install -r requirements.txt
```

### 3. Frontend (Node)

```bash
# From project root
npm install
```

### 4. Environment files

- Add backend `.env` with `GROQ_API_KEY` (and optionally LangSmith keys).
- Add root `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_API_KEY`.

---

## Running the Application

You need **two** processes: backend API and frontend dev server.

### 1. Start the Backend API

From the project root, run the FastAPI app with Uvicorn. The app is in `src/backend/main.py`:

```bash
# From project root (ai-planet-file-upload-site)
uvicorn src.backend.main:app --reload --host 0.0.0.0 --port 8000
```

Or from inside `src/backend`:

```bash
cd src/backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

- API base URL: **http://localhost:8000**
- Interactive docs: **http://localhost:8000/docs**

### 2. Start the Frontend

In a **second terminal**, from the project root:

```bash
npm run dev
```

- App URL: **http://localhost:5173** (or the port Vite prints).

### 3. Use the app

1. Open the app in the browser.
2. Click **Upload File** and choose a **PDF**.
3. Wait for “Uploading document…” / “Parsing document…” to finish.
4. Type questions in the chat and press Enter or send; answers are based on the uploaded PDF.

---

## Testing the API

### Using the UI

1. Start backend and frontend as above.
2. Upload a PDF via the **Upload File** button.
3. Ask questions in the chat; responses are from the RAG pipeline.

### Using cURL

**Health check:**

```bash
curl http://localhost:8000/
```

Expected: `{"message":"ALL is well!"}`

**Upload a PDF:**

```bash
curl -X POST http://localhost:8000/upload/ \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/your/document.pdf"
```

Expected: `{"filename":"document.pdf"}` (or the actual filename).

**Chat (ask a question):**

```bash
curl -X POST http://localhost:8000/chat/ \
  -H "Content-Type: application/json" \
  -d "{\"prompt\": \"What is this document about?\"}"
```

Response: plain text answer from the RAG pipeline.

### Using Swagger UI

1. Open **http://localhost:8000/docs**.
2. Use **POST /upload/** to upload a PDF (form field: `file`).
3. Use **POST /chat/** with body `{"prompt": "Your question here"}`.

### Using HTTPie (optional)

```bash
# Upload
http -f POST http://localhost:8000/upload/ file@/path/to/file.pdf

# Chat
http POST http://localhost:8000/chat/ prompt="What is the main topic?"
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check. Returns `{"message":"ALL is well!"}`. |
| `POST` | `/upload/` | Upload a PDF. Body: `multipart/form-data` with key `file`. Returns `{"filename":"<name>.pdf"}`. Only PDF is allowed (400 otherwise). |
| `POST` | `/chat/` | Send a question. Body: `{"prompt": "Your question"}`. Returns the answer as plain text. Requires a document to be uploaded first (in-memory RAG state). |

**Notes:**

- The backend keeps **one** RAG index in memory; each new upload **replaces** it.
- If you restart the backend, you must upload a PDF again before using `/chat/`.

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| **“Only PDF files are allowed”** | Ensure the upload is `application/pdf` and the file is a valid PDF. |
| **Empty or bad chat responses** | Ensure you’ve uploaded a PDF first and that the document has extractable text (not only images). |
| **CORS errors** | Backend uses `allow_origins=["*"]`. If you use a different frontend URL, add it to CORS in `main.py`. |
| **Backend not found (e.g. 404)** | Confirm you’re running Uvicorn with the correct module path (`src.backend.main:app` from root or `main:app` from `src/backend`). |
| **Supabase upload fails** | Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_API_KEY`, and that the `file-uploads` bucket exists and allows uploads. |
| **Groq / LangChain errors** | Verify `GROQ_API_KEY` in the backend `.env`. If using LangSmith, set `LANGCHAIN_TRACING_V2` and `LANGCHAIN_API_KEY`. |

---

## License

See the repository license file (if present).
