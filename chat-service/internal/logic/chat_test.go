package logic_test

import (
	"context"
	"testing"

	"github.com/scotttjoiner/go-chat/chat-service/internal/logic"
	pb "github.com/scotttjoiner/go-chat/chat-service/proto"
)

func TestSendMessage(t *testing.T) {
	srv := &logic.ChatServer{}

	req := &pb.SendRequest{
		Message: &pb.ChatMessage{
			User: "test-bot",
			Text: "This is a test",
			Room: "test-room",
		},
	}

	res, err := srv.SendMessage(context.Background(), req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if !res.Success {
		t.Errorf("expected success=true, got %v", res.Success)
	}
}
