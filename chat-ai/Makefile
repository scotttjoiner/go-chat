.PHONY: proto run install add clean shell lint test

# === Paths ===
PROTO_SRC=../proto/chat.proto
PROTO_OUT=chat_ai/proto
POETRY=poetry

# === Targets ===

# Create/refresh gRPC stubs
proto:
	poetry run python -m grpc_tools.protoc \
		-I../proto \
		--python_out=$(PROTO_OUT) \
		--grpc_python_out=$(PROTO_OUT) \
		../proto/chat.proto
	sed -i 's/^import chat_pb2/from . import chat_pb2/' $(PROTO_OUT)/chat_pb2_grpc.py

# Run the chat-ai service
run:
	$(POETRY) run chat-ai

# Install all dependencies
install:
	$(POETRY) install

# Add a new dependency (e.g., make add PACKAGE=transformers)
add:
	$(POETRY) add $(PACKAGE)

# Clean generated files
clean:
	rm -f $(PROTO_OUT)/chat_pb2*.py

# Run linter
lint:
	$(POETRY) run flake8 chat_ai

format:
	$(POETRY) run black chat_ai tests

# Run tests
test:
	$(POETRY) run pytest

requirements:
	$(POETRY) export -f requirements.txt --output requirements.txt --without-hashes

# Default goal
#.DEFAULT_GOAL := run