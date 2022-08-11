import { Box, Container, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import PrayerForm from '../../components/forms/PrayerForm';
import Page from '../../components/others/Page';
import Layout from '../../layouts';

export default function PageX() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <Page title='Contact'>
      <Container size='md' className=''>
        <Box className='flex flex-col w-full mx-auto mt-20 mb-10'>
          <Text className='text-3xl font-semibold leading-10'>Prayer reply</Text>
        </Box>

        <PrayerForm id={id} />
      </Container>
    </Page>
  );
}

PageX.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='admin'>{page}</Layout>;
};
