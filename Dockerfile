# --- Development Stage ---
FROM node:18 AS development

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files for development
COPY . .

# Expose the development port
EXPOSE 3000

# Command for development (with hot-reloading)
CMD ["npm", "start"]

# --- Production Stage ---
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies and build the project
COPY package*.json ./
RUN npm install --production

# Copy the source code and build the app
COPY . .
RUN npm run build

# --- Serve Production Build ---
FROM nginx:alpine AS production

# Copy React build output to the nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
