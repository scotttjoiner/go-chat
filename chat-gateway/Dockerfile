# Use official Node.js LTS base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the source code
COPY . .

# Set environment variables if needed (optional)
# ENV NODE_ENV=production

# Expose port (match your WebSocket server port, e.g. 8081)
EXPOSE 8081

# Run the gateway server
CMD [ "node", "src/server.js" ]