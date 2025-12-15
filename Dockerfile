# Use official Node.js LTS image
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Force npm to use a writable cache directory
RUN npm config set cache /usr/src/app/.npm-cache --global

# Install production deps, ignoring peer conflicts
RUN npm install --omit=dev --legacy-peer-deps

COPY . .

CMD ["node", "server.js"]