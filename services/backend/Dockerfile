# ========================================
# Stage 1: Build (Builder)
# ========================================
FROM ruby:3.3 AS builder

# Install build dependencies
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Gemfiles and install gems (only production)
COPY Gemfile Gemfile.lock ./
RUN bundle install --without development test

# Copy app source code
COPY . .

# Uncomment if you precompile assets:
# RUN bundle exec rake assets:precompile


# ========================================
# Stage 2: Production Runtime
# ========================================
FROM ruby:3.3-slim

# Install minimal dependencies
RUN apt-get update -qq && apt-get install -y \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN groupadd -r rails && useradd -r -g rails rails

# App directory
WORKDIR /app

# Copy gems and app from builder and set ownership
COPY --from=builder --chown=rails:rails /usr/local/bundle /usr/local/bundle
COPY --from=builder --chown=rails:rails /app /app

# Ensure entrypoint is executable
RUN chmod +x /app/docker-entrypoint.sh

# Production environment variables
ENV RAILS_ENV=production \
    RAILS_LOG_TO_STDOUT=true \
    PORT=5000

# Switch to non-root user
USER rails

# Expose port
EXPOSE 5000

# Healthcheck endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD curl -f http://127.0.0.1:5000/up || exit 1

# Entrypoint and default command
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
