# Use an official Node.js 18 runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy all code into the container
COPY . .

# Expose port 8080
EXPOSE 8080

# Set the entrypoint for the container/ yarn start can be used later
ENTRYPOINT [ "yarn", "start" ]
