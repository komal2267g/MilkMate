# Use Node.js for the frontend
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose React's default port
EXPOSE 3000

# Start React
CMD ["npm", "start"]