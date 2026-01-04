# Ai-Planet Chat Assistant
This is an application developed to upload **PDF** documents, and then ask questions to the chatbot regarding the file.

## Technologies Used
**Frontend:** React\
**Backend:** FastAPI\
**Database:** Supabase(SQL)\
**NLP:** Langchain (for RAG pipeline), Groq-API (for chat model), Hugging-Face(embeddings), FAISS (vector store)

## Steps to setup
1. Copy all the files into your system. 
2. Install the project dependencies by copying the **package.json** file into the desired folder and then run `npm install`.
3. Make sure to first create and activate Python virtual environment to ensure app runs properly.
4. Install the Python libraries using `pip install -r requirements.txt` inside the **backend** folder.
5. Set up the required **environment variables** from `.env` file, like API keys.
6. Run `npm run dev` to start the application frontend, in the root project folder, i.e., _ai-planet-file-upload-site_.
7. Run `uvicorn main:app --reload` to start the backend server, in the _ai-planet-file-upload-site/src/backend_ folder.
8. Upload **ONLY PDF** document, and then ask questions related to it.


## Usage steps & tips
1. Make sure the **URLs - `http://localhost:8000/` and `http://localhost:5173/`** are not engaged in any other application, as their unavailability will require changing the code accordingly.
2. Upload the file before asking any questions. Wait for the file to be uploaded and to be parsed. This waiting time could vary depending upon system and file size.
3. Once parsed, the document won't take much time answering the queries.
4. When the frontend page is reloaded, i.e., that one hosted on `http://localhost:5173/`, only the chats are cleared, the previously uploaded file's data will still be there and any number of page reloads would'nt affect that data.
5. Get answers to your queries !

-----

## **This application uploads the documents to the Supabase database connected to it, and this connection could be easily turned OFF, as there is not procedural requirement for the database. This application would work same, and use of Supabase just allows keep track of the different documents entered.

https://github.com/user-attachments/assets/57dbc419-db22-4db3-9d03-ec345d83636c
