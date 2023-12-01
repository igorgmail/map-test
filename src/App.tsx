import React from 'react';
import MapMain from './Components/MapMain';
import { Container } from '@mui/material';

function App() {
  return (
    <Container sx={{ width: '100%', height: '100vh' }}>
      <MapMain></MapMain>
    </Container>
  );
}

export default App;
