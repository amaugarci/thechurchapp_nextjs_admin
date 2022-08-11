import { Box, Button, Grid, Textarea, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Send } from 'tabler-icons-react';
import * as Yup from 'yup';
import { Prayer } from '../../models/model.prayer';
import { apiGetPrayer, apiUpdatePrayer } from '../../models_services/firestore_service';
import { FormError } from './_FormError';
import FormSkelenton from './_FormSkelenton';

interface IProps {
  id?: string;
  prayer?: Prayer | null;
}

export default function PrayerForm({ id }: { id?: string }) {
  const [isInitLoading, setIsInitLoading] = useState(id != null ? true : false);
  const [prayer, setPrayer] = useState<Prayer | null>(null);

  async function getInitData() {
    if (id) setPrayer(await apiGetPrayer(id));
    setIsInitLoading(false);
  }

  useEffect(() => {
    getInitData();
  }, []);

  if (isInitLoading) return <FormSkelenton />;
  if (!prayer && id) return <FormError />;

  return <Form id={id} prayer={prayer} />;
}

function Form({ id, prayer }: IProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<CustomFile | null>(null);

  const schema = Yup.object({
    reply: Yup.string().required('Reply is required'),
    email: Yup.string(),
    phone: Yup.string(),
    name: Yup.string(),
    message: Yup.string().required('Message is required')
  });

  const form = useForm({
    schema: yupResolver(schema),

    initialValues: {
      reply: prayer?.reply ?? '',
      email: prayer?.email ?? '',
      phone: prayer?.phone ?? '',
      name: prayer?.name ?? '',
      message: prayer?.message ?? ''
    }
  });

  const handleSubmit = async () => {
    if (form.validate().hasErrors) return;

    try {
      setIsLoading(true);

      await apiUpdatePrayer(id!, form.values.reply);

      setIsLoading(false);

      router.push('/prayers');

      showNotification({
        title: 'Success',
        message: 'Location was created',
        autoClose: 6000
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'There was an error creating the location',
        autoClose: 6000
      });
    }
  };

  return (
    <Box className=''>
      <Grid align={'start'}>
        <Grid.Col md={12} xs={12}>
          <TextInput className='mt-4' placeholder='Name' label='Name' {...form.getInputProps('name')} disabled />
          <TextInput className='mt-4' placeholder='Email' label='Email' {...form.getInputProps('email')} disabled />
          <TextInput className='mt-4' placeholder='Phone' label='Phone' {...form.getInputProps('phone')} disabled />
          <TextInput className='mt-4' placeholder='Message' label='Message' {...form.getInputProps('message')} disabled />
          <Textarea minRows={3} className='mt-4' placeholder='Reply' label='Reply' {...form.getInputProps('reply')} />
        </Grid.Col>

        <Grid.Col md={12} xs={12}>
          <Box>
            <Button
              onClick={handleSubmit}
              leftIcon={<Send size={14} />}
              variant='filled'
              className='w-full mt-10 bg-gradient-to-r from-indigo-500 text-sm via-purple-500 to-pink-500 border-0 hover:opacity-90 hover:text-md'>
              Submit
            </Button>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export interface CustomFile extends File {
  path?: string;
  preview?: string;
}
