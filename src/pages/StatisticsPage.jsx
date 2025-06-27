import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import StatsCard from '../components/StatsCard';
import Log from '../middleware/logger';

function StatisticsPage() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    Log("frontend", "debug", "page", "StatisticsPage loaded");

    // Simulated dummy stats
    const dummyData = [
      {
        shortURL: "http://short.ly/xyz123",
        longURL: "https://example.com/some/long/link",
        createdAt: "2025-06-27T10:00:00Z",
        expiresAt: "2025-06-27T11:00:00Z",
        clicks: [
          { timestamp: "2025-06-27T10:05:00Z", location: "Mumbai" },
          { timestamp: "2025-06-27T10:15:00Z", location: "Delhi" },
        ]
      },
      {
        shortURL: "http://short.ly/test456",
        longURL: "https://openai.com/chatgpt",
        createdAt: "2025-06-26T18:00:00Z",
        expiresAt: "2025-06-26T19:00:00Z",
        clicks: []
      }
    ];

    setStats(dummyData);
    Log("frontend", "debug", "state", "Dummy stats set in StatisticsPage");
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>URL Statistics</Typography>

      {stats.length === 0 ? (
        <Typography>No stats available.</Typography>
      ) : (
        <Grid container spacing={2}>
          {stats.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <StatsCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default StatisticsPage;
