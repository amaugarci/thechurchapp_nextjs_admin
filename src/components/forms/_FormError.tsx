import { Box, Text } from '@mantine/core';
import React from 'react';
export function FormError({}) {
  return (
    <Box className='border p-10 flex flex-col items-center rounded-md'>
      <img className='w-[400px] object-contain' src='/images/form-error.png' alt='' />
      <Text className='text-center mt-10'>There was an error loading the form. Please try again later.</Text>
    </Box>
  );
}
