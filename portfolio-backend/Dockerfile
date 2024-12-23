# Use the official Node.js 18 image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the remaining app files to the working directory
COPY . .

# Expose the application port
EXPOSE 7000

# Command to run the app
CMD ["npm", "start"]


