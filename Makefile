.PHONY: all chat-ai chat-service chat-gateway chat-client scripts proto clean test lint build fmt node

## Run everything
all: proto build test

## Build all projects
build: chat-service-build chat-ai-build chat-gateway-build scripts-build

## Run tests for all projects
test: chat-service-test chat-ai-test chat-gateway-test

## Lint everything (Python only for now)
lint: chat-ai-lint chat-gateway-lint

## Format everything
fmt: chat-service-fmt chat-ai-fmt

## Run everything
run-all: 
	node scripts/src/run-all.js

## Compile protobufs (both sides, sequentially)
proto:
	$(MAKE) -C chat-service proto
	$(MAKE) -C chat-ai proto

## Clean all
clean:
	$(MAKE) -C chat-service clean
	$(MAKE) -C chat-ai clean

## --- Chat Service Commands ---
chat-service-build:
	$(MAKE) -C chat-service build

chat-service-test:
	$(MAKE) -C chat-service test

chat-service-fmt:
	$(MAKE) -C chat-service fmt

## --- Chat AI Commands ---
chat-ai-build:
	$(MAKE) -C chat-ai build

chat-ai-test:
	$(MAKE) -C chat-ai test

chat-ai-lint:
	$(MAKE) -C chat-ai lint

chat-ai-fmt:
	$(MAKE) -C chat-ai fmt

chat-gateway-build:
	$(MAKE) -C chat-gateway build

chat-gateway-test:
	$(MAKE) -C chat-gateway test

chat-gateway-lint:
	$(MAKE) -C chat-gateway lint

chat-client-build:
	$(MAKE) -C chat-client build

scripts-build:
	$(MAKE) -C scripts build