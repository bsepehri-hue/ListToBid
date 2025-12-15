# Use official Node.js LTS image
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Redirect npm cache to a writable directory
RUN npm config set cache /usr/src/app/.npm-cache --global

# Install production dependencies, ignoring peer conflicts
RUN npm install --omit=dev --legacy-peer-deps

COPY . .

CMD ["node", "server.js"]