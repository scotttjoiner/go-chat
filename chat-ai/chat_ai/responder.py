import logging
from transformers import pipeline
from chat_ai.proto import chat_pb2

# Setup once — can go in a shared `utils.py` if you prefer
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

_model = None

def get_model():
    global _model
    if _model is None:
        logger.info("Loading language model...")
        _model = pipeline("text-generation", model="microsoft/DialoGPT-medium")
    return _model


def generate_reply(prompt: str) -> str:
    model = get_model()
    output = model(
        prompt,
        max_new_tokens=50,  # replaces max_length to avoid conflict
        pad_token_id=50256,
        truncation=True,
        return_full_text=False
    )
    return output[0]["generated_text"]

def send_to_chat_service(stub, text: str, user: str = "ai-bot", room: str = "general"):
    message = chat_pb2.ChatMessage(user=user, text=text, room=room)
    request = chat_pb2.SendRequest(message=message)
    stub.SendMessage(request)
