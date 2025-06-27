/**
 * Reusable Logging Middleware Function for Affordmed Frontend App
 * This will be used in your React components and services
 */

const API_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

/**
 * Log a message to the Affordmed Test Server
 * @param {string} stack - 'frontend'
 * @param {string} level - 'debug' | 'warn' | 'error' | 'fatal'
 * @param {string} pkg - 'component', 'page', 'state', 'auth', 'config', 'middleware', 'utils'
 * @param {string} message - Description of the event or issue
 */
async function Log(stack, level, pkg, message) {
  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });

    const data = await res.json();

    if (res.status === 200) {
      console.log("✅ Log Sent:", data.message);
    } else {
      console.warn("⚠️ Logging Failed:", data.message || res.statusText);
    }
  } catch (err) {
    console.error("❌ Logging Error:", err.message);
  }
}

export default Log;
