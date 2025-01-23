# Use an official Node.js LTS version as the base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the package files first (to leverage Docker caching)
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the source code into the container
COPY . .

# Set the environment variable for the app port
ENV PORT=7005

# Expose the correct port
EXPOSE 7005

# Command to run the application
CMD ["npm", "run", "start:prod"]
