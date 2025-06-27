import Log from '../middleware/logger';

// ✅ Replace this with your real Bearer token from auth response
const AUTH_TOKEN = "ey3hbGci0i3IUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMi0nsiZXhwIjoxNzQzNTc@MzO8L CPYXQIOJE 3NDMINZOWND QS Imlzcy161kFm2m926112cisimpeas IQTWOSAZEINKSLIZENOR NSB4ZDU5LThiMWJ1ZmE4MTZkYSIsInN1YiI6InJhbWtyaXNobmFAYWJjLmVkdSJ9LCJlbWFpbCI6In hbwtyaXNobmFAYWJjLmVkdSIsIm5hbWUi0iJyYW@ga3Jpc2huYSIsInJvbGx0byI6ImFhMWiIiwiYw NF2xN-029kZSI6InhnOxNDOvIsImNsaWVudE1EIjoi2DliYmI20TktNmEyNy@eNGE1LThkNTktOGIxY mVmYTgxNmRhIiwiY2xpZW50U2VjcmV0IjoidFZKYWFhUk]TZVhjU1h1TSJ9.YApD98gq0IN_Oww7DMf muUFK1m4hLTm7AICLDCLAZVg";

const API_BASE_URL = "http://20.244.56.144/evaluation-service";

/**
 * Send a batch of URLs to be shortened via POST
 * @param {Array} urls - Array of { longURL, validity?, shortcode? }
 * @returns {Promise} API response
 */
export async function shortenURL(urls) {
  try {
    const response = await fetch(`${API_BASE_URL}/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "AUTH_TOKEN"
      },
      body: JSON.stringify({ urls }),
    });

    const data = await response.json();

    if (response.ok) {
      Log("frontend", "debug", "service", "Shorten URL API call successful");
      return data;
    } else {
      Log("frontend", "error", "service", `Shorten API failed: ${data.message || 'Unknown error'}`);
      throw new Error(data.message || "Failed to shorten URLs");
    }
  } catch (err) {
    Log("frontend", "fatal", "service", `API call error: ${err.message}`);
    throw err;
  }
}
