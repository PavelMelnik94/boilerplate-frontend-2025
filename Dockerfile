# Use a Node.js base image
FROM node:20.18.2-bookworm-slim

# Set the working directory
WORKDIR /app

# Copy the project files into the Docker image
COPY . .

# Install dependencies
RUN npm install

# Build the project
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the development server
CMD ["npm", "run", "dev"]
