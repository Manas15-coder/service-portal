import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Loader = () => {
  return (
    <Box sx={{ display: 'flex', marginTop: '20%',display:'inline-block',marginLeft:'auto',marginRight:'auto', color: '#00589f;' }}>
      <CircularProgress color='primary' />
    </Box>
  )
}

export default Loader
