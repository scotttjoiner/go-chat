![Build](https://github.com/scotttjoiner/go-chat/actions/workflows/main.yml/badge.svg)

# go-chat

A multi-service, cloud-native chat system prototype built to explore gRPC, WebSockets, multi-language service orchestration, and real-time messaging infrastructure.

## Overview

This system includes:

- **chat-service**: Core backend (Go) using gRPC for message processing and broadcasting
- **chat-gateway**: WebSocket bridge (Node.js) between frontend clients and gRPC
- **chat-ai**: AI responder (Python) powered by Hugging Face transformers, listening via gRPC stream
- **chat-client**: Lightweight HTML/Vue.js frontend for testing gateway connection

## Features

- Bi-directional chat flow using gRPC and WebSocket
- Modular, multi-language architecture (Go, Node.js, Python, Vue.js)
- AI-generated responses using a Hugging Face transformer model
- Isolated development environments using devcontainers and Dockerfiles
- Unified `Makefile` and `concurrently`-powered orchestration
- Docker Compose configuration for full stack deployment

## Development

Each service has its own Makefile for local dev. You can run everything at once with:

```bash
make run-all
```

Or run them individually:

```bash
make -C chat-service run
make -C chat-gateway run
make -C chat-ai run
make -C chat-client run
```

## Testing

Basic unit tests are scaffolded for each service. Run them using:

```bash
make -C chat-service test
make -C chat-ai test
```

## Docker Compose

To bring up all services:

```bash
docker-compose up --build
```

Services will be available at:
- `chat-service`: gRPC at `localhost:8080`
- `chat-gateway`: WebSocket server at `localhost:8081`
- `chat-client`: Vue.js test page served at `localhost:3000`

---

## Full System Overview (Extended)

### Services

- **chat-gateway**: Node.js WebSocket bridge that proxies messages between frontend clients and `chat-service`
- **chat-client**: Simple static Vue.js test page served over Python HTTP, connects via WebSocket to the gateway
- **chat-ai**: Python gRPC stream listener that connects to `chat-service` and replies to user messages using a Hugging Face model

### Development Workflow

Run all services concurrently:

```bash
make run-all
```

This uses a custom script powered by [`concurrently`](https://www.npmjs.com/package/concurrently) to orchestrate startup of all services.

Each service also has an individual `Makefile` to support:

- `make run`
- `make test`
- `make proto`
- `make lint` (where applicable)

### Docker Support

To run the full system using Docker:

```bash
docker-compose up --build
```

The following ports will be exposed:
- `8080`: gRPC service (`chat-service`)
- `8081`: WebSocket gateway (`chat-gateway`)
- `3000`: Static client HTML page (`chat-client`)

All containers share a virtual network and reference `chat-service` by name.

---

## Status

All services scaffolded with basic unit tests and development Makefiles.
The AI responder connects successfully to the gRPC stream.
Logging, proto generation, and local dev tools are implemented.

## Roadmap

- [ ] **Add multi-room support** to enable isolated conversations per room (e.g., `general`, `support`, `random`)
- [ ] **Externalize configuration** for ports, model selection, and service hosts via environment variables or `.env` files
- [ ] **Harden service loops** with retries, timeouts, and graceful reconnection for all gRPC streaming clients
- [ ] **Enhance AI response quality** with context history, prompt tuning, or model upgrade (e.g., replace DialoGPT)
- [ ] **Integrate logging frameworks** with consistent formats, timestamps, and log levels across all services

---

## License

MIT
