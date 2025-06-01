import os
import tempfile
from urllib import response
from click import prompt
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import fitz
from langchain.schema import Document
from pydantic import BaseModel
from dotenv import load_dotenv


from langchain_RAG import analyze_pdf
from langchain_RAG import ask_question

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message":"ALL is well!"}


# Defining the retrieval chain globally
retrieval_chain = None

@app.post("/upload/")
async def create_upload_file(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    

    print("File received: ")
    contents = await file.read()
    print("File content type: ", contents.title)

    # get OS temp directory
    temp_dir = tempfile.gettempdir() 
    temp_path = os.path.join(temp_dir, file.filename)

    # Save to temp file
    # temp_path = f"/tmp/{file.filename}"
    with open(temp_path, "wb") as f:
        f.write(contents)

    # Extract text from PDF
    doc = fitz.open(temp_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text()


    docs = [Document(page_content=full_text)]
    
    response = await analyze_pdf(docs)
    print("Response from analyze_pdf: ", response)
    
    # closing the document and removing the temp file
    doc.close()
    os.remove(temp_path)

    print("Filename: ", file.filename)
    return {"filename": file.filename}


class ChatRequest(BaseModel):
    prompt: str

@app.post('/chat/')
async def chatResponse(request: ChatRequest):
    prompt = request.prompt
    print("Received question: ", prompt)
    
    if not prompt:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")
    
    response_from_ask_question = await ask_question(prompt)
    response = response_from_ask_question["response"]
    print("Response from ask_question: ", response)
    return response

print("Starting the FastAPI application...")