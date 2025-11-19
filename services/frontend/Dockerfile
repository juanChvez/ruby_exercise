# =========================
# Stage 1: Build the frontend
# =========================
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy all source code
COPY . .

# Build the project
RUN npm run build

# =========================
# Stage 2: Serve with NGINX
# =========================
FROM nginx:stable-alpine

# Copy build files to NGINX html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom NGINX config template
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Copy the entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh

# Ensure the entrypoint script has executable permissions
RUN chmod +x /docker-entrypoint.sh

# Expose port 80 for HTTP traffic
EXPOSE 80

# Set the entrypoint script to substitute environment variables before starting NGINX
ENTRYPOINT ["/docker-entrypoint.sh"]

# Specify the default command to start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]