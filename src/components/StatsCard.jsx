import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Divider, Box } from '@mui/material';
import Log from '../middleware/logger';

function StatsCard({ item }) {
  useEffect(() => {
    Log("frontend", "debug", "component", `StatsCard rendered for ${item.shortURL}`);
  }, [item.shortURL]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Short URL: {item.shortURL}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Original URL: {item.longURL}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2">
          Created At: {new Date(item.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          Expires At: {new Date(item.expiresAt).toLocaleString()}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body1" fontWeight="bold">
          Total Clicks: {item.clicks?.length || 0}
        </Typography>

        {item.clicks?.length > 0 && (
          <Box mt={1}>
            <Typography variant="subtitle2">Click Details:</Typography>
            {item.clicks.map((click, i) => (
              <Typography key={i} variant="caption">
                {new Date(click.timestamp).toLocaleString()} - {click.location}
              </Typography>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default StatsCard;
