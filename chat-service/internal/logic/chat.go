package logic

import (
	"context"
	"log"
	"time"

	pb "github.com/scotttjoiner/go-chat/chat-service/proto"
)

type ChatServer struct {
	pb.UnimplementedChatServiceServer
}

func (s *ChatServer) SendMessage(ctx context.Context, req *pb.SendRequest) (*pb.Ack, error) {
	msg := req.GetMessage()
	log.Printf("Received message from %s: %s", msg.GetUser(), msg.GetText())
	return &pb.Ack{Success: true}, nil
}

func (s *ChatServer) StreamMessages(req *pb.StreamRequest, stream pb.ChatService_StreamMessagesServer) error {
	// TODO: Replace with real channel/queue
	messages := []*pb.ChatMessage{
		{User: "test-user", Text: "Hello AI! Tell me a joke.", Room: "general"},
	}

	for _, msg := range messages {
		stream.Send(msg)
		time.Sleep(2 * time.Second)
	}

	return nil
}
