import { Box, Button } from '@mantine/core';
import Link from 'next/link';
import { ReactElement } from 'react';
import Page from '../components/others/Page';
import Layout from '../layouts';

export default function PageX() {
  return (
    <Page title='404 Page Not Found'>
      <Box className='dark:bg-black min-h-[85vh] flex flex-col items-center justify-center'>
        <Box sx={{ fontSize: 'xl', fontWeight: 'bold' }}>404</Box>
        <Box sx={{ fontSize: 'lg', fontWeight: 'bold' }}>Page not found</Box>

        <Link href='/' passHref>
          <Button className='btn' sx={{ marginTop: 8 }}>
            Go Home
          </Button>
        </Link>
      </Box>
    </Page>
  );
}

PageX.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='logoOnly'>{page}</Layout>;
};
