#!/bin/sh
set -e

# Replace the placeholder (VITE_API_URL_PLACEHOLDER)
# with the value of the Railway environment variable ($VITE_API_URL)
# in the NGINX config template, saving the result as the final NGINX config file.

# Use 'sed' instead of 'envsubst' since 'envsubst' isn't always available on Alpine images,
# whereas 'sed' is more universally present in base images.
sed -i "s|VITE_API_URL_PLACEHOLDER|$VITE_API_URL|g" /etc/nginx/conf.d/default.conf.template

# Copy the modified template to the config file that NGINX actually uses
cp /etc/nginx/conf.d/default.conf.template /etc/nginx/conf.d/default.conf

# Execute the main NGINX command (the CMD)
exec "$@"