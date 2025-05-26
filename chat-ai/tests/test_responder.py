# tests/test_responder.py

from chat_ai.responder import generate_reply

def test_generate_reply_runs():
    prompt = "User: Hello\nAI:"
    reply = generate_reply(prompt)
    
    assert isinstance(reply, str)
    assert len(reply.strip()) > 0