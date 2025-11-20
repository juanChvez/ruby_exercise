# --- Stage 2: Runtime ---
FROM ruby:3.3-slim

RUN apt-get update -qq && apt-get install -y \
    libpq5 curl \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd -r rails && useradd -r -g rails rails

WORKDIR /app

# Copy bundle and app from builder with proper ownership
COPY --from=builder --chown=rails:rails /usr/local/bundle /usr/local/bundle
COPY --from=builder --chown=rails:rails /app /app

# Ensure the entrypoint script is executable
RUN chmod +x /app/docker-entrypoint.sh

ENV RAILS_ENV=production \
    RAILS_LOG_TO_STDOUT=true \
    PORT=5000

USER rails

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD curl -f http://127.0.0.1:5000/up || exit 1

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]