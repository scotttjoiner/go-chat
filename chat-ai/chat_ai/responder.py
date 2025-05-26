from transformers import pipeline

_model = None

def get_model():
    global _model
    if _model is None:
        print("Loading language model...")
        _model = pipeline("text-generation", model="microsoft/DialoGPT-medium")
    return _model


def generate_reply(prompt: str) -> str:
    model = get_model()
    output = model(
        prompt,
        max_new_tokens=50,  # replaces max_length to avoid conflict
        pad_token_id=50256,
        truncation=True
    )
    return output[0]["generated_text"]