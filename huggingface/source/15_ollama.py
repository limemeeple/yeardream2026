#uv pip install ollama
from multiprocessing.connection import Client

from ollama import chat
text = input('ollama 와 대화해 보세요!\n');

def chat_generate(input):
    print(f'입력내용 : {input}')
    print('생각중....')
    resp = chat(
        model="exaone3.5:2.4b",
        messages=[{'role':'user', 'content':input}]
    )
    print(resp.message.content)

#chat_generate(text)

def chat_stream(input):
    print(f'입력내용 : {input}')
    print('생각중....')
    resp = chat(
        model="hf.co/Jackrong/Qwen3.5-4B-Claude-4.6-Opus-Reasoning-Distilled-GGUF",
        messages=[{'role': 'user', 'content': input}],
        stream = True
    )

    for chunk in resp:
        # end=''가 없으면 한글자라 찍힐때 마다 줄바꿈이 된다.
        # flush=True stream 에 남아있는 잔여 데이터를 모두 밖으로 내보낸다.
        print(chunk.message.content, end='', flush=True)

chat_stream(text)