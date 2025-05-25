from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

from fastapi import FastAPI, Query
# from src.backend.langchain_service import analyze_pdf


app = FastAPI()

@app.get("/")
async def root():
    return {"message":"ALL is well!"}


# async def analyze_pdf(pdf_url: str = Query(...)):
#     summary = await analyze_pdf_summary(pdf_url)
    # return {"summary": summary}

