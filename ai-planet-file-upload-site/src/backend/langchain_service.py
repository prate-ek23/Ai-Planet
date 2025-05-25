import os
from dotenv import load_dotenv

# Langchain related imports
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
# from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import FAISS

# loading env file
load_dotenv() 

os.environ["OPENAI_API_KEY"]=os.getenv("OPENAI_API_KEY")
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"]=os.getenv("LANGCHAIN_API_KEY")

# Loading the PDF file
loader = PyPDFLoader("attention.pdf")
docs = loader.load()

# Splitting the documents into smaller chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=20)
texts = text_splitter.split_documents(docs)[:5]

documents=text_splitter.split_documents(docs)

embeddings_model = OpenAIEmbeddings()
embeddings = embeddings_model.embed_documents(
    [
        "Hi there!",
        "Oh, hello!",
        "What's your name?",
        "My friends call me World",
        "Hello World!"
    ]
)

# db=FAISS.from_documents(documents[:30],OpenAIEmbeddings())











# import requests
# import io
# from langchain_community.document_loaders import PyPDFLoader
# from langchain.chat_models import ChatOpenAI
# from langchain.chains.summarize import load_summarize_chain

# async def analyze_pdf_summary(pdf_url):
#     response = requests.get(pdf_url)
#     pdf_file = io.BytesIO(response.content)

#     loader = PyPDFLoader(pdf_file)
#     documents = loader.load()

#     llm = ChatOpenAI(api_key="your-openai-key", temperature=0)
#     chain = load_summarize_chain(llm, chain_type="map_reduce")

#     summary = chain.run(documents)
#     return summary
print("Langchain service initialized.")