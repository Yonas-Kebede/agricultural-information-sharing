import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, MenuItem, Paper, Select } from '@mui/material';
import { Line} from 'react-chartjs-2';
import { format } from 'timeago.js';
import { Chart } from 'chart.js';
import { Chart as ChartJS } from "chart.js/auto"
// Register the linear scale


const RetrieveMarket = () => {
  const [filter, setFilter] = useState('');
  const [cropData, setCropData] = useState([]);

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/market/getcrop/${filter}`);
        setCropData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCropData();
  }, [filter]);

  const labels = cropData.map(item => format(item.date)); // Assuming the date property exists in the crop data
  const values = cropData.map(item => item.price); // Assuming the value property exists in the crop data

  const data = {
    labels,
    datasets: [
      {
        label: 'Market price',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Box marginLeft="1rem">
      <h2>Crop Data Bar Graph</h2>
        <label style={{ marginRight: '0.5rem' }}>Filter by Category:</label>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          variant="outlined"
          size="small"
          label="Filter by Category"
        >
          <MenuItem value="teff">teff</MenuItem>
          <MenuItem value="wheat">wheat</MenuItem>
          <MenuItem value="barley">barley</MenuItem>
          <MenuItem value="dagusa">dagusa</MenuItem>
          <MenuItem value="maize">maize</MenuItem>
        </Select>
      </Box>
      <Paper elevation={2} sx={{ width: '100%',marginTop:'2%' }}>
        
        <Line data={data} options={options} />
       
      </Paper>
    </div>
  );
};

export default RetrieveMarket;
