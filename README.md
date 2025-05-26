# go-chat

A simple gRPC-based chat system with an AI responder, designed as a mono-repo.  
This project demonstrates real-time streaming using WebSockets/gRPC, AI-generated responses using Python, and cross-language communication using Protocol Buffers.

---

## Project Structure

```
go-chat/
├── chat-service/      # Go gRPC server
│   ├── cmd/server     # Main server entrypoint
│   ├── internal/logic # ChatService implementation
│   ├── proto/         # Generated protobuf code (Go)
│   ├── Makefile       # Build, proto, and test commands
│   └── Dockerfile     # Container support
├── chat-ai/           # Python gRPC AI client
│   ├── chat_ai/       # Source code and generated proto
│   ├── tests/         # Pytest unit tests
│   ├── Makefile       # Install, run, test, and lint
│   ├── Dockerfile     # Dev container and poetry support
│   └── pyproject.toml # Poetry config
├── proto/             # Shared protobuf definitions
│   └── chat.proto
└── docker-compose.yml (optional)
```

---

## Requirements

- Go 1.23+
- Python 3.11+
- [Poetry](https://python-poetry.org/)
- `protoc` + plugins (`protoc-gen-go`, `protoc-gen-go-grpc`, `grpcio-tools`)
- VS Code Codespaces (optional, supported)

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/go-chat.git
cd go-chat
```

---

### 2. Compile Protobufs

```bash
cd chat-service
make proto
```

This will:
- Compile `proto/chat.proto`
- Output Go bindings into `chat-service/proto/`
- Output Python bindings into `chat-ai/chat_ai/proto/` (run `make proto` in `chat-ai` too)

---

### 3. Run the gRPC Chat Server (Go)

```bash
cd chat-service
make run
```

This will:
- Start the server on port `8080`
- Stream a test message to connected clients

---

### 4. Run the AI Responder (Python)

```bash
cd chat-ai
make install
make run
```

This will:
- Connect to the chat-service
- Listen for streamed messages (e.g., from `test-user`)
- Generate an AI reply using a local HuggingFace model
- Send the reply back via `SendMessage`

---

## Testing

### Go Unit Tests

```bash
cd chat-service
make test
```

### Python Unit Tests

```bash
cd chat-ai
make test
```

---

## Development Tips

- To reformat Go code: `make fmt`
- To reformat Python code: `make format`
- To clean generated files: `make clean`
- To regenerate stubs: `make proto`

---

## Roadmap

- [ ] Replace hardcoded message stream with real-time fan-out
- [ ] Add WebSocket gateway for browser clients
- [ ] Improve AI response filtering and persona logic
- [ ] Docker Compose for multi-container local dev
- [ ] CI/CD pipeline for builds and tests

---

## License

MIT
