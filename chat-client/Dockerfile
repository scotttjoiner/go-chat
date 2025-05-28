# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with a lightweight web server
FROM nginx:alpine

# Copy built files from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]