# Use a lightweight Node.js image
FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy all application files
COPY . .

# Run the web server
CMD ["npm", "run", "serve"]