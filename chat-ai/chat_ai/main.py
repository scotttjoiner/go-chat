import grpc
from chat_ai.proto import chat_pb2, chat_pb2_grpc
from chat_ai.responder import generate_reply


def send_to_chat_service(stub, text: str, user: str = "ai-bot", room: str = "general"):
    message = chat_pb2.ChatMessage(user=user, text=text, room=room)
    request = chat_pb2.SendRequest(message=message)
    stub.SendMessage(request)


def main():
    print("Chat AI listening...")

    with grpc.insecure_channel("localhost:8080") as channel:
        stub = chat_pb2_grpc.ChatServiceStub(channel)

        # Start stream
        stream = stub.StreamMessages(chat_pb2.StreamRequest(room="general"))

        for incoming in stream:
            user = incoming.user
            text = incoming.text

            print(f"[{user}]: {text}")

            if user == "ai-bot":
                continue  # Don't respond to ourselves

            # Generate reply and send back
            prompt = f"User: {text}\nAI:"
            reply = generate_reply(prompt)

            send_to_chat_service(stub, reply.strip())

            print(f"[ai-bot]: {reply.strip()}")


if __name__ == "__main__":
    main()