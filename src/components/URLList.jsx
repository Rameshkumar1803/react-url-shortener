import React, { useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Log from '../middleware/logger';

function URLList({ results }) {
  useEffect(() => {
    Log("frontend", "debug", "component", "URLList rendered with results");
  }, [results]);

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>Shortened URLs</Typography>

      {results.map((item, index) => (
        <Paper key={index} sx={{ p: 2, mt: 2 }}>
          <Typography><strong>Short URL:</strong> {item.shortURL}</Typography>
          <Typography><strong>Original URL:</strong> {item.longURL}</Typography>
          <Typography><strong>Expires At:</strong> {item.expiresAt}</Typography>
          <Typography><strong>Total Clicks:</strong> {item.clicks?.length || 0}</Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default URLList;
