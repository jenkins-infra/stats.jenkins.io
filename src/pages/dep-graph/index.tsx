// App.tsx or another relevant component
import React from 'react';
import { Stack } from '@mui/material';
import DependencyGraph from './Graph';

const App: React.FC = () => {
  return (
    <Stack sx={
        {
            minHeight: '100vh',
            maxHeight: '100vh',
            width: '100vw',
            backgroundColor: '#f0f0f0',
        }
    }>
      <DependencyGraph />
      </Stack>
  );
};

export default App;
