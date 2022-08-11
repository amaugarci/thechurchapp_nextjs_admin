import { Box, Button, Grid, Text, Textarea, TextInput } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Send } from 'tabler-icons-react';
import * as Yup from 'yup';
import { Event } from '../../models/model.event';
import { getFirebaseStorageDownloadUrl } from '../../models_services/firebase_image_service';
import { apiCreateEvent, apiUpdateEvent, apiGetEvent } from '../../models_services/firestore_service';
import { FormError } from './_FormError';
import FormSkelenton from './_FormSkelenton';

interface IProps {
  id?: string;
  announcement?: Event | null;
}

export default function EventForm({ id }: { id?: string }) {
  const [isInitLoading, setIsInitLoading] = useState(id != null ? true : false);
  const [event, setEvent] = useState<Event | null>(null);

  async function getInitData() {
    if (id) setEvent(await apiGetEvent(id));
    setIsInitLoading(false);
  }

  useEffect(() => {
    getInitData();
  }, []);

  if (isInitLoading) return <FormSkelenton />;
  if (!event && id) return <FormError />;

  return <Form id={id} announcement={event} />;
}

function Form({ id, announcement: event }: IProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<CustomFile | null>(null);

  const handleDropFiles = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setFile(Object.assign(file, { preview: URL.createObjectURL(file) }));
    }
  };

  const schema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    link: Yup.string().url('Invalid URL'),
    imageUrl: Yup.string(),
    location: Yup.string().required('Required'),
    eventDate: Yup.date().required('Required'),
    eventTime: Yup.string().required('Required')
  });

  const form = useForm({
    schema: yupResolver(schema),

    initialValues: {
      name: event?.name || '',
      description: event?.description || '',
      link: event?.link || '',
      imageUrl: event?.imageUrl || '',
      location: event?.location || '',
      eventDate: event?.eventDate ?? null,
      eventTime: event?.eventTime ?? null
    }
  });

  const handleSubmit = async () => {
    if (form.validate().hasErrors) return;

    const eventDatetime = new Date(form.values.eventDate!);
    const eventTime = new Date(form.values.eventTime!);
    eventDatetime.setHours(eventTime.getHours());
    eventDatetime.setMinutes(eventTime.getMinutes());

    try {
      setIsLoading(true);
      const s = new Event();
      s.name = form.values.name;
      s.description = form.values.description;
      s.link = form.values.link;
      s.imageUrl = form.values.imageUrl;
      s.location = form.values.location;
      s.eventDate = eventDatetime;
      s.eventTime = form.values.eventTime;
      s.eventDateTime = eventDatetime;

      if (file) s.imageUrl = await getFirebaseStorageDownloadUrl({ file: file! });

      if (!event) await apiCreateEvent(s);
      if (event && id) await apiUpdateEvent(id, s);

      setIsLoading(false);

      router.push('/events');

      showNotification({
        title: 'Success',
        message: 'Event was created',
        autoClose: 6000
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'There was an error creating the notification',
        autoClose: 6000
      });
    }
  };

  const dropzoneChildren = (status: DropzoneStatus) => {
    const removeFile = () => {
      form.setFieldValue('imageUrl', '');
      setFile(null);
    };
    if (form.values.imageUrl != '') {
      return (
        <Box className='relative flex justify-center'>
          <img className='h-[300px]' src={form.values.imageUrl} alt='Preview' />
          <Button className='btn absolute right-0 top-0 z-40' onClick={removeFile}>
            Remove
          </Button>
        </Box>
      );
    }
    if (file)
      return (
        <Box className='relative flex justify-center'>
          <img className='h-[300px]' src={file.preview} alt='Preview' />
          <Button className='btn absolute right-0 top-0 z-40' onClick={removeFile}>
            Remove
          </Button>
        </Box>
      );
    return (
      <Box className='min-h-[300px] pointer-events-none flex justify-center items-center text-center'>
        <div>
          <Text size='xl' inline>
            Drag images here or click to select files
          </Text>
          <Text size='sm' color='dimmed' inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Box>
    );
  };

  return (
    <Box className=''>
      <Grid align={'start'}>
        <Grid.Col md={12} xs={12}>
          <TextInput className='mt-4' placeholder='Name' label='Name' {...form.getInputProps('name')} />
          <Textarea minRows={3} className='mt-4' placeholder='Description' label='Description' {...form.getInputProps('description')} />
          <Textarea minRows={2} className='mt-4' placeholder='Location' label='Location' {...form.getInputProps('location')} />
          <TextInput className='mt-4' placeholder='Link' label='Link' {...form.getInputProps('link')} />
        </Grid.Col>

        <Grid.Col md={6} xs={12}>
          <DatePicker label='Event day' className='mt-4' {...form.getInputProps('eventDate')} />
        </Grid.Col>
        <Grid.Col md={6} xs={12}>
          <TimeInput label='Event time' className='mt-4' format='12' {...form.getInputProps('eventTime')} />
        </Grid.Col>

        <Grid.Col md={12} xs={12}>
          <Dropzone
            className='mt-8 p-2 z-0'
            multiple={false}
            disabled={file != null || form.values.imageUrl != ''}
            onDrop={handleDropFiles}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}>
            {(status) => dropzoneChildren(status)}
          </Dropzone>
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
