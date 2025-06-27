import Log from '../middleware/logger';

/**
 * Validate if the URL is in proper format.
 * @param {string} url 
 * @returns {boolean}
 */
export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    Log("frontend", "warn", "utils", `Invalid URL validation failed: ${url}`);
    return false;
  }
}

/**
 * Validate shortcode (alphanumeric, max 10 chars).
 * @param {string} code 
 * @returns {boolean}
 */
export function isValidShortcode(code) {
  const regex = /^[a-zA-Z0-9]{1,10}$/;
  const isValid = regex.test(code);
  if (!isValid) {
    Log("frontend", "warn", "utils", `Shortcode validation failed: ${code}`);
  }
  return isValid;
}

/**
 * Validates if validity is a number between 1 and 60
 * @param {string | number} val 
 * @returns {boolean}
 */
export function isValidValidity(val) {
  const num = parseInt(val);
  const isValid = !isNaN(num) && num >= 1 && num <= 60;
  if (!isValid) {
    Log("frontend", "warn", "utils", `Validity validation failed: ${val}`);
  }
  return isValid;
}
