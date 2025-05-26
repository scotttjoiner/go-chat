# Build stage
FROM golang:1 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o server ./cmd/server

# Runtime stage
FROM gcr.io/distroless/base-debian11

WORKDIR /app
COPY --from=builder /app/server .

# Default gRPC port
EXPOSE 8080

ENTRYPOINT ["/app/server"]