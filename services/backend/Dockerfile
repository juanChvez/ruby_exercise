# ---------- Builder Stage ----------
FROM ruby:3.3-slim AS builder

# Install build tools and dependencies
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    nodejs \
    npm \
    git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Gemfile and Gemfile.lock for bundler caching
COPY Gemfile* ./

# Install only production gems
RUN gem install bundler && \
    bundle config set --local deployment true && \
    bundle config set --local without 'development test' && \
    bundle install --jobs 4 --retry 3

# Copy the app code
COPY . .

# Precompile Rails assets (Sprockets/Propshaft if used)
RUN RAILS_ENV=production SECRET_KEY_BASE=dummy \
    bundle exec rails assets:precompile

# Clean up build leftovers
RUN rm -rf node_modules tmp/cache vendor/bundle/ruby/*/cache

# ---------- Runtime Stage ----------
FROM ruby:3.3-slim

# Install only the minimal runtime dependencies
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
    libpq5 \
    curl && \
    rm -rf /var/lib/apt/lists/*

# Add a non-root user (rails)
RUN groupadd -r rails && useradd -r -g rails rails

WORKDIR /app

# Copy built gems and app files from builder, set user:group
COPY --from=builder --chown=rails:rails /usr/local/bundle /usr/local/bundle
COPY --from=builder --chown=rails:rails /app /app

# Production environment/config flags
ENV RAILS_ENV=production \
    RAILS_LOG_TO_STDOUT=true \
    RAILS_SERVE_STATIC_FILES=true \
    PORT=5000

# Use non-root user
USER rails

# Expose the default Rails port
EXPOSE 5000

# Healthcheck endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD curl -f http://localhost:5000/up || exit 1

# Copy entrypoint and make it executable
COPY --chown=rails:rails docker-entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

# Start Rails server using Puma config
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]