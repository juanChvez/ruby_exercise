# Base image
FROM postgres:15-alpine

# Install additional extensions
RUN apk add --no-cache postgresql-contrib

# Copy your SQL initialization scripts
COPY ./init-db/*.sql /docker-entrypoint-initdb.d/

# (Optional) create a backup folder
RUN mkdir -p /data_backup

# (Optional) custom startup command
CMD ["sh", "-c", "cp -r /docker-entrypoint-initdb.d/* /data_backup/ && docker-entrypoint.sh postgres"]

# Expose port
EXPOSE 5432