import { Box, Button, Container, Text, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

import { ReactElement, useEffect, useState } from 'react';
import { Send } from 'tabler-icons-react';
import * as Yup from 'yup';
import Page from '../../components/others/Page';
import AuthGuard from '../../guards/AuthGuard';
import { signinWithEmail } from '../../models_services/firebase_auth_services';
import { useAppDispatch, useAppSelector } from '../../models_store/_store';

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.firebaseAuth);

  const schema = Yup.object({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  });

  const form = useForm({
    schema: yupResolver(schema),

    initialValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = async () => {
    if (form.validate().hasErrors) return;

    try {
      setIsLoading(true);
      const user = await signinWithEmail(form.values.email, form.values.password);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Invalid email or password',
        autoClose: 6000
      });
    }
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isInitialized]);

  return (
    <Page title='Sign in'>
      <Container size='xs' className='min-h-screen flex flex-col justify-center items-center'>
        <Box className='flex flex-col w-full mx-auto mt-4 mb-10'>
          <Text className='text-3xl font-medium leading-10 text-center'>Sign in</Text>
          <TextInput className='mt-4' placeholder='Email' label='Email' {...form.getInputProps('email')} />
          <TextInput type='password' className='mt-4' placeholder='Password' label='Password' {...form.getInputProps('password')} />

          <Button
            onClick={handleSubmit}
            leftIcon={<Send size={14} />}
            variant='filled'
            className='w-full mt-10 bg-gradient-to-r from-indigo-500 text-sm via-purple-500 to-pink-500 border-0 hover:opacity-90 hover:text-md'>
            Submit
          </Button>

          <Box className='flex justify-end'>
            <Button loading={isLoading} className='mt-6 btn-text' onClick={() => router.push('/auth/reset-password')}>
              Reset password
            </Button>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthGuard>{page}</AuthGuard>;
};
