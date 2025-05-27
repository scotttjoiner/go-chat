import grpc
import time
from chat_ai.proto import chat_pb2, chat_pb2_grpc
from chat_ai.responder import generate_reply, send_to_chat_service


def main():
    print("Chat AI starting...")

    while True:
        try:
            with grpc.insecure_channel("localhost:8080") as channel:
                stub = chat_pb2_grpc.ChatServiceStub(channel)

                print("Connected to chat-service. Listening...")

                stream = stub.StreamMessages(chat_pb2.StreamRequest(room="general"))

                for incoming in stream:
                    user = incoming.user
                    text = incoming.text

                    if user == "ai-bot" or not "@ai" in text:
                        continue  # Skip our own messages

                    print(f"[{user}]: {text}")

                    prompt = f"User: {text.replace('@ai', '')}\nAI:"
                    reply = generate_reply(prompt)

                    send_to_chat_service(stub, reply.strip())
                    print(f"[ai-bot]: {reply.strip()}")

        except grpc.RpcError as e:
            print(f"gRPC error: {e.code().name} - {e.details()}")
            print("Retrying connection in 3 seconds...")
            time.sleep(3)

        except Exception as e:
            print(f"Unexpected error: {e}")
            print("Retrying connection in 3 seconds...")
            time.sleep(3)

if __name__ == "__main__":
    main()