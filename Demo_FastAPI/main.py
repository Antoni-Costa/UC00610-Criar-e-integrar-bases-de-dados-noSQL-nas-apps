from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
	return {"message": "Olá"}

@app.get("/infos")
async def root():
	return {"message": "infos"}

@app.get("/infos/name")
async def say_hello(name: str):
	return {"message": f"infos de {name}!"}

@app.get("/infos2/name")
async def say_hello(name: str, page: int = 1):
	return {"message 2": f"infos do {name}!", f"page {page}"}