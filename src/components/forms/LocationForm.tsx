import { Box, Button, Grid, Text, Textarea, TextInput } from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Send } from 'tabler-icons-react';
import * as Yup from 'yup';
import { Location } from '../../models/model.location';
import { getFirebaseStorageDownloadUrl } from '../../models_services/firebase_image_service';
import { apiCreateLocation, apiGetLocation, apiUpdateLocation } from '../../models_services/firestore_service';
import { FormError } from './_FormError';
import FormSkelenton from './_FormSkelenton';

interface IProps {
  id?: string;
  announcement?: Location | null;
}

export default function LocationForm({ id }: { id?: string }) {
  const [isInitLoading, setIsInitLoading] = useState(id != null ? true : false);
  const [location, setLocation] = useState<Location | null>(null);

  async function getInitData() {
    if (id) setLocation(await apiGetLocation(id));
    setIsInitLoading(false);
  }

  useEffect(() => {
    getInitData();
  }, []);

  if (isInitLoading) return <FormSkelenton />;
  if (!location && id) return <FormError />;

  return <Form id={id} announcement={location} />;
}

function Form({ id, announcement: location }: IProps) {
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
    name: Yup.string().required('Name is required'),
    pastor: Yup.string().required('Pastor is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().required('Email is required'),
    address: Yup.string().required('Address is required'),
    imageUrl: Yup.string()
  });

  const form = useForm({
    schema: yupResolver(schema),

    initialValues: {
      name: location?.name ?? '',
      pastor: location?.pastor ?? '',
      phone: location?.phone ?? '',
      email: location?.email ?? '',
      address: location?.address ?? '',
      imageUrl: location?.imageUrl ?? ''
    }
  });

  const handleSubmit = async () => {
    if (form.validate().hasErrors) return;

    try {
      setIsLoading(true);
      const s = new Location();
      s.name = form.values.name;
      s.pastor = form.values.pastor;
      s.phone = form.values.phone;
      s.email = form.values.email;
      s.address = form.values.address;
      s.imageUrl = form.values.imageUrl;

      if (file) s.imageUrl = await getFirebaseStorageDownloadUrl({ file: file! });

      if (!location) await apiCreateLocation(s);
      if (location && id) await apiUpdateLocation(id, s);

      setIsLoading(false);

      router.push('/locations');

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
          <TextInput className='mt-4' placeholder='Pastor' label='Pastor' {...form.getInputProps('pastor')} />
          <TextInput className='mt-4' placeholder='Phone' label='Phone' {...form.getInputProps('phone')} />
          <TextInput className='mt-4' placeholder='Link' label='Link' {...form.getInputProps('email')} />
          <TextInput className='mt-4' placeholder='Address' label='Address' {...form.getInputProps('address')} />
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
