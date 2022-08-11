import { Box, Button, Grid, Textarea, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { Send } from 'tabler-icons-react';
import * as Yup from 'yup';
import { Notification } from '../../models/model.notification';
import { apiCreateNotification } from '../../models_services/firestore_service';

interface IProps {}

export default function NotificationForm() {
  return <Form />;
}

const schema = Yup.object({
  title: Yup.string().required('Required'),
  body: Yup.string().required('Required')
});

function Form({}: IProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    schema: yupResolver(schema),

    initialValues: {
      title: '',
      body: ''
    }
  });

  const handleSubmit = async () => {
    if (form.validate().hasErrors) return;

    try {
      setIsLoading(true);
      const x = new Notification();
      x.title = form.values.title;
      x.body = form.values.body;

      await apiCreateNotification(x);
      setIsLoading(false);

      form.reset();

      showNotification({
        title: 'Success',
        message: 'Notification sent',
        autoClose: 6000
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'There was an error creating the notification',
        autoClose: 6000
      });
    }
  };

  return (
    <Box className=''>
      <Grid align={'start'}>
        <Grid.Col md={12} xs={12}>
          <TextInput className='mt-4' placeholder='Title' label='Title' {...form.getInputProps('title')} />
          <Textarea minRows={3} className='mt-4' placeholder='Body' label='Body' {...form.getInputProps('body')} />
        </Grid.Col>

        <Grid.Col md={12} xs={12}>
          <Box>
            <Button
              onClick={handleSubmit}
              leftIcon={<Send size={14} />}
              variant='filled'
              disabled={isLoading}
              className='w-full mt-10 bg-gradient-to-r from-indigo-500 text-sm via-purple-500 to-pink-500 border-0 hover:opacity-90 hover:text-md'>
              Submit
            </Button>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
