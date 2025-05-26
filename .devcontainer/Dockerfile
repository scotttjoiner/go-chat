# Start from the latest official Go dev container image (Go 1.x)
FROM mcr.microsoft.com/devcontainers/go:1

# This image provides:
# - The latest Go 1.x version
# - GOPATH=/go, GOBIN=/go/bin (which is added to PATH)
# - A non-root user 'vscode' (UID 1000) which is the default user.
# - The /go directory is typically owned by 'vscode'.
# - Basic Ubuntu environment with tools like git, curl.

# Switch to root for system-level installations
USER root

# Update package lists and install common dependencies:
# - curl: For downloading files (might be pre-installed, but good to ensure).
# - unzip: Required for extracting protoc.
# - python3 & python3-pip: For Python development.
# - nodejs & npm: For Node.js and React development.
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    python3 \
    python3-pip \
    nodejs \
    npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install protoc (v21.12) globally
ENV PROTOC_VERSION=21.12
RUN curl -LO https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-linux-x86_64.zip && \
    unzip protoc-${PROTOC_VERSION}-linux-x86_64.zip -d /usr/local && \
    rm protoc-${PROTOC_VERSION}-linux-x86_64.zip && \
    # Ensure protoc is executable by all users
    chmod +x /usr/local/bin/protoc

# Revert to the default non-root user ('vscode') for subsequent operations
# This user owns the /go directory, and its GOBIN (/go/bin) is in the PATH.
USER vscode

# Install Go gRPC plugins as the 'vscode' user.
# They will be installed into /go/bin.
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.31.0 && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.3.0 && \
     go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest

# The container is now configured with the latest Go 1.x, Python, Node.js, npm, protoc, and Go gRPC plugins.
# It will run as the 'vscode' user by default.

# Install Poetry (runs under 'vscode' user)
ENV POETRY_HOME="/home/vscode/.local"
ENV PATH="$POETRY_HOME/bin:$PATH"

RUN curl -sSL https://install.python-poetry.org | python3 -

# Configure Poetry to use in-project virtualenvs (optional, but great for mono-repos)
RUN poetry config virtualenvs.in-project true