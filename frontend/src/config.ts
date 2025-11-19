/**
 * Application configuration object.
 * @property {string} apiUrl - Base URL for backend API requests.
 * @property {string} env - Current frontend environment (e.g., "development" or "production").
 */
interface Config {
    apiUrl: string;
    env: string;
}

/**
 * App-wide configuration management and helpers.
 * 
 * This file provides the main configuration object (`config`) for the frontend application.
 * 
 * Environment detection:
 * - `apiUrl`: In development (`import.meta.env.MODE === "development"`), uses `VITE_API_URL` env variable or defaults to `http://localhost:5000/api`.
 *   In production or other build modes, uses a relative `/api` endpoint which should be routed by the HTTP server (e.g., NGINX).
 * - `env`: Indicates the current frontend environment mode.
 *
 * Usage:
 *   import config from './config'
 *   fetch(`${config.apiUrl}/something`)
 */

const currentMode = import.meta.env.MODE || "development";

/**
 * Determines the appropriate API base URL depending on the current environment mode.
 * - In development mode, uses a value from the VITE_API_URL environment variable (usually set as an .env var), 
 *   or defaults to http://localhost:5000/api.
 * - In production or any other build mode, uses a relative path ("/api") that should be handled by NGINX or the HTTP server proxy.
 *
 * @param {string} mode - The current frontend environment mode ("development", "production", etc.).
 * @returns {string} - The base URL for API requests.
 */
const getApiUrl = (mode: string): string => {
    if (mode === "development") {
        // In local development, point to the local backend API server.
        return import.meta.env.VITE_API_URL || "http://localhost:5000/graphql";
    }
    // In production or other build modes, use a relative API route
    // which is expected to be proxied by NGINX or the web server.
    return "/graphql"; 
};

/**
 * The main configuration object for the frontend application.
 * 
 * @type {Config}
 */
const config:Config = {
  apiUrl: getApiUrl(currentMode),
  env: currentMode,
};

export default config;
