# Use official Node.js LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install --production

# Copy source files
COPY . .

# Expose WebSocket port
EXPOSE 4000

# Start server.js
CMD ["node", "server.js"]