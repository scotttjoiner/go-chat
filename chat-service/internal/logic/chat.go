package logic

import (
	"context"
	"log"
	"sync"

	pb "github.com/scotttjoiner/go-chat/chat-service/proto"
)

var subscribers []chan *pb.ChatMessage
var mu sync.Mutex

type ChatServer struct {
	pb.UnimplementedChatServiceServer
}

func (s *ChatServer) SendMessage(ctx context.Context, req *pb.SendRequest) (*pb.Ack, error) {
	mu.Lock()
	defer mu.Unlock()

	for _, ch := range subscribers {
		select {
		case ch <- req.Message:
		default:
			log.Println("Subscriber channel full, dropping message")
		}
	}

	return &pb.Ack{Success: true}, nil
}

func (s *ChatServer) StreamMessages(req *pb.StreamRequest, stream pb.ChatService_StreamMessagesServer) error {
	msgChan := make(chan *pb.ChatMessage, 10)

	mu.Lock()
	subscribers = append(subscribers, msgChan)
	mu.Unlock()

	defer func() {
		mu.Lock()
		for i, ch := range subscribers {
			if ch == msgChan {
				subscribers = append(subscribers[:i], subscribers[i+1:]...)
				break
			}
		}
		mu.Unlock()
	}()

	for msg := range msgChan {
		if msg.Room == req.Room {
			if err := stream.Send(msg); err != nil {
				log.Printf("Stream send error: %v", err)
				return err
			}
		}
	}

	return nil
}
