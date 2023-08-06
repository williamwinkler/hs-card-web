# Dockerfile
# Stage 1: Build the React app
FROM node:19.5.0 as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the built app u    sing a simple HTTP server
FROM node:19.5.0-alpine

WORKDIR /app
COPY --from=build-stage /app/build /app/build

EXPOSE 80

CMD ["npx", "http-server", "build", "-p", "80"]
