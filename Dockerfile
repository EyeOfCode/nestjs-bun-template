# Use the official Node.js image as the base image
# You can use any version that fits your usecase
FROM node:22

# Set the working directory inside the container
WORKDIR /var/www/source

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies for the application
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"
RUN bun install

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the application listens on
RUN bun run build

# Start the application
CMD [ "node", "dist/src/main.js" ]