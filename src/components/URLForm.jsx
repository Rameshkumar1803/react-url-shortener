import React from 'react';
import { TextField, Grid } from '@mui/material';
import Log from '../middleware/logger';

function URLForm({ index, input, handleInputChange }) {
  const handleChange = (field, value) => {
    Log("frontend", "debug", "component", `Input changed - Field: ${field}, Value: ${value}`);
    handleInputChange(index, field, value);
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12} md={5}>
        <TextField
          fullWidth
          label="Long URL"
          value={input.longURL}
          onChange={(e) => handleChange('longURL', e.target.value)}
          required
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          fullWidth
          label="Validity (minutes)"
          value={input.validity}
          onChange={(e) => handleChange('validity', e.target.value)}
          type="number"
          inputProps={{ min: 1, max: 60 }}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          fullWidth
          label="Custom Shortcode (optional)"
          value={input.shortcode}
          onChange={(e) => handleChange('shortcode', e.target.value)}
        />
      </Grid>
    </Grid>
  );
}

export default URLForm;
