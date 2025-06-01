from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_huggingface import HuggingFaceEmbeddings

# from langchain_ollama import OllamaEmbeddings

from fastapi import HTTPException
import os
from dotenv import load_dotenv
load_dotenv() 

os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"]=os.getenv("LANGCHAIN_API_KEY")
LANGCHAIN_API_KEY=os.environ['LANGCHAIN_API_KEY']
groq_api_key=os.environ['GROQ_API_KEY']


retrieval_chain = None

async def analyze_pdf(docs=None):

    global retrieval_chain
    print("Starting langchain_RAG")
    
    if(not docs):
        print("No docs returning from langchain_RAG")
        return None
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=20)
    final_documents = text_splitter.split_documents(docs)



    llm=ChatGroq(groq_api_key=groq_api_key, 
                 model_name="deepseek-r1-distill-llama-70b")

    # embeddings=OllamaEmbeddings(model="llama3.2:1b")
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")


    if(not final_documents):
        print("No documents to process.")

    print("Final documents received ", len(final_documents))

    prompt=ChatPromptTemplate.from_template(
        """ Answer the questions based on the provided context only.Please provide the most accurate response based on the question.
        <context>
        {context}
        </context>
        Questions:{input}
        """
        )


    if((not embeddings) or (not final_documents)):
        print("No embeddings or documents to process.")
        return None
    
    vectors=FAISS.from_documents(final_documents,embeddings)
    document_chain = create_stuff_documents_chain(llm, prompt)
    retriever = vectors.as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, document_chain)

    print("Retrieval chain created successfully.")

    return {"res": "success"}




import re
def clean_response(raw_response):
    cleaned = re.sub(r"<think>.*?</think>", "", raw_response, flags=re.DOTALL)

    # Remove markdown bold (**text**) and italics (*text*)
    cleaned = re.sub(r"\*\*(.*?)\*\*", r"\1", cleaned)  # bold
    cleaned = re.sub(r"\*(.*?)\*", r"\1", cleaned)      # italic
    cleaned = re.sub(r"__(.*?)__", r"\1", cleaned)      # underline

    # Remove extra whitespace or line breaks
    cleaned = cleaned.strip()

    return cleaned


async def ask_question(prompt):
    print("Received question: ", prompt)
    if not prompt:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")
    
    raw_response = retrieval_chain.invoke({"input": prompt})
    cleaned_response = clean_response(raw_response["answer"])
    print("Response from retrieval_chain: ", cleaned_response)
    
    return {"response": cleaned_response}


print("Langchain service initialized.")