import { Box, Container, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import EventForm from '../../components/forms/EventForm';
import Page from '../../components/others/Page';
import Layout from '../../layouts';

export default function PageX() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <Page title='New notification'>
      <Container size='md' className=''>
        <Box className='flex flex-col w-full mx-auto mt-20 mb-10'>
          <Text className='text-3xl font-semibold leading-10'>New event</Text>
        </Box>
        <EventForm />
      </Container>
    </Page>
  );
}

PageX.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='admin'>{page}</Layout>;
};
