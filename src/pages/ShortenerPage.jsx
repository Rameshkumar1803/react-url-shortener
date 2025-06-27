import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { shortenURL } from '../services/api';
import Log from '../middleware/logger';
import { isValidURL, isValidShortcode, isValidValidity } from '../utils/validators';
import URLForm from '../components/URLForm';
import URLList from '../components/URLList';

function ShortenerPage() {
  const [urls, setUrls] = useState([
    { longURL: '', validity: '', shortcode: '' }
  ]);
  const [results, setResults] = useState([]);

  const handleInputChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleShorten = async () => {
    const payload = urls.filter(({ longURL }) => longURL.trim() !== '');

    if (payload.length === 0) {
      alert("Please enter at least one valid URL.");
      Log("frontend", "warn", "page", "Shorten attempted with empty input");
      return;
    }

    for (let entry of payload) {
      if (!isValidURL(entry.longURL)) {
        alert("One or more URLs are invalid.");
        Log("frontend", "error", "utils", `Invalid URL: ${entry.longURL}`);
        return;
      }
      if (entry.shortcode && !isValidShortcode(entry.shortcode)) {
        alert("Invalid shortcode format.");
        Log("frontend", "error", "utils", `Invalid shortcode: ${entry.shortcode}`);
        return;
      }
      if (entry.validity && !isValidValidity(entry.validity)) {
        alert("Invalid validity. Please enter a number between 1 and 60.");
        Log("frontend", "error", "utils", `Invalid validity: ${entry.validity}`);
        return;
      }
    }

    try {
      const response = await shortenURL(payload);
      setResults(response.data);
      Log("frontend", "debug", "page", "URLs shortened successfully");
    } catch (err) {
      alert("Failed to shorten URLs. Please try again.");
      Log("frontend", "fatal", "page", "Shortener API call failed");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>

      {urls.map((input, i) => (
        <URLForm
          key={i}
          index={i}
          input={input}
          handleInputChange={handleInputChange}
        />
      ))}

      {urls.length < 5 && (
        <Button
          variant="outlined"
          sx={{ mt: 2, mr: 2 }}
          onClick={() => setUrls([...urls, { longURL: '', validity: '', shortcode: '' }])}
        >
          Add Another URL
        </Button>
      )}

      <Button variant="contained" onClick={handleShorten} sx={{ mt: 2 }}>
        Shorten
      </Button>

      {results.length > 0 && <URLList results={results} />}
    </Box>
  );
}

export default ShortenerPage;
