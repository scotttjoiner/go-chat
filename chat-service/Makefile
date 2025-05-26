.PHONY: proto clean run build test

PROTO_SRC=../proto/chat.proto
PROTO_OUT=./proto
PROTO_PATH=../proto


# Run the gRPC server
run:
	DEBUG=true go run ./cmd/server

# Compile protobufs
proto:
	protoc \
		--proto_path=$(PROTO_PATH) \
		--go_out=$(PROTO_OUT) --go_opt=paths=source_relative \
		--go-grpc_out=$(PROTO_OUT) --go-grpc_opt=paths=source_relative \
		$(PROTO_SRC)

# Clean generated files
clean:
	rm -f $(PROTO_OUT)/*.pb.go

# Build all Go packages
build:
	go mod tidy
	go build ./...

# Run all tests (optional if you add tests)
test:
	go test ./...

fmt:
	go fmt ./...