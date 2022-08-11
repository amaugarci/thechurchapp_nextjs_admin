import { Box } from '@mantine/core';
import { Circles } from 'react-loader-spinner';

export function LoadingScreen() {
  return (
    <Box className='min-h-screen flex flex-col justify-center items-center'>
      <Circles color='grey' height={65} width={65} />
    </Box>
  );
}
