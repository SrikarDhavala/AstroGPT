# 🌌 Astro-GPT: Full-Stack AI Research Assistant

Astro-GPT is a specialized AI Research Assistant designed to analyze and summarize astrophysics research papers using **Retrieval-Augmented Generation (RAG)**. This project features a modern **ReactJS** frontend and a **FastAPI** (Python) backend.

---

## 🚀 Key Features

- **Live Research Fetching:** Queries the arXiv API for the latest papers on black holes and astrophysics.
- **Context-Aware Chat:** Uses a Vector Database to provide grounded answers based on actual scientific text.
- **Reactive UI:** Built with React for a smooth, single-page application experience.
- **PDF Analysis:** Automatically parses multi-column scientific PDFs into searchable embeddings.

## 🛠️ Technology Stack

### Frontend

- **ReactJS (Vite):** Fast, component-based UI.
- **Tailwind CSS v4:** For sleek, scientific-themed styling.
- **Axios:** For seamless communication with the Python API.

### Backend

- **FastAPI:** High-performance Python web framework.
- **LangChain:** Orchestrates the RAG pipeline.
- **ChromaDB:** Vector storage for semantic search.
- **OpenAI API:** Powers the natural language reasoning.
- **MongoDB**