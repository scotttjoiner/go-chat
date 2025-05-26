package main

import (
	"fmt"
	"log"
	"net"
	"os"

	"github.com/scotttjoiner/go-chat/chat-service/internal/logic"
	pb "github.com/scotttjoiner/go-chat/chat-service/proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	lis, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	pb.RegisterChatServiceServer(grpcServer, &logic.ChatServer{})

	if os.Getenv("DEBUG") == "true" {
		reflection.Register(grpcServer)
		log.Println("gRPC reflection enabled (debug mode)")
	}
	fmt.Println("gRPC server listening on port 8080...")
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
