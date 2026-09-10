# uv pip install uvicorn fastapi
# uvicorn main:app --reload
import time
from fastapi import FastAPI
from starlette.responses import RedirectResponse

app = FastAPI()

@app.get("/")
def main():
    # redirect : 특정 주소로 이동
    return RedirectResponse("/view/index.html")

@app.get("/calc")
def calc(val1:int, oper:str, val2:int):
    print(f'{val1} {oper} {val2} = ?')
    time.sleep(5)
    result = 0

    if oper == '+':
        result = val1 + val2
    elif oper == '-':
        result = val1 - val2
    elif oper == '*':
        result = val1 * val2
    elif oper == '/':
        result = val1 / val2

    return {"result": result}
