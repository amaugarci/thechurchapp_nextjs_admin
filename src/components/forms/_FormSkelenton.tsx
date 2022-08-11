import { Box, Skeleton } from '@mantine/core';
import React from 'react';

export default function FormSkelenton({}) {
  return (
    <Box className=''>
      <Skeleton mt={6} height={30} radius='xs' />
      <Skeleton mt={6} height={30} radius='xs' />
      <Skeleton mt={6} height={30} radius='xs' />
      <Skeleton mt={6} height={30} radius='xs' />
      <Skeleton mt={6} height={30} width='90%' radius='xs' />
      <Skeleton mt={6} height={30} width='80%' radius='xs' />
    </Box>
  );
}
