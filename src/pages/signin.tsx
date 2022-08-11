import { Box, Button, Container, createStyles, Divider, Grid, Image, Text, Textarea, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { ReactElement } from 'react';
import { Send, BrandGoogle } from 'tabler-icons-react';
import * as Yup from 'yup';
import Page from '../components/others/Page';
import Layout from '../layouts';

const schema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password should have at least 8 letters').required('Password is required')
});

export default function PageX() {
  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = () => {
    if (form.validate().hasErrors) return;
    console.log(form.values);
  };

  return (
    <Page title='Contact'>
      <Container size='xl' className=''>
        <Box className='flex flex-col text-center w-full mx-auto mt-20'>
          <Text className='text-4xl font-semibold leading-10'>Sign in</Text>
          <Text className='mt-4'>Enter your credentials below</Text>
        </Box>

        <Box className='mt-32 flex flex-col items-center'>
          <Box className='w-[600px]'>
            <TextInput className='mt-4' placeholder='Email' label='Email' {...form.getInputProps('email')} />
            <TextInput type='password' className='mt-4' placeholder='Password' label='Password' {...form.getInputProps('password')} />

            <Button
              onClick={handleSubmit}
              leftIcon={<Send size={14} />}
              variant='filled'
              className='w-full mt-10 h-12 bg-gradient-to-r from-indigo-500 text-sm via-purple-500 to-pink-500 border-0 hover:opacity-90 hover:text-md'>
              Sign in with email
            </Button>
          </Box>

          <Box className='w-[600px] mt-10'>
            <Box className='flex items-center'>
              <div className='w-full border-t border-gray-700' />
              <Text className='mx-4'>Or</Text>
              <div className='w-full border-t border-gray-700' />
            </Box>
            <Button
              onClick={handleSubmit}
              leftIcon={<BrandGoogle size={20} />}
              variant='white'
              className='w-full mt-10 h-12 text-white bg-red-600 border-0 hover:opacity-90 hover:text-md text-sm'>
              Sign in with Google
            </Button>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}

PageX.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='logoOnly'>{page}</Layout>;
};

const useStyles = createStyles((theme) => ({}));
