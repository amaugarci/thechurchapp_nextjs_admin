import { Box, createStyles, Drawer, Text } from '@mantine/core';
import Link from 'next/link';
import Iconify from '../../components/others/Iconify';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function DrawerMain({ isOpen, setIsOpen }: Props) {
  const { classes } = useStyles();
  return (
    <Drawer
      className='dark:bg-black'
      title=''
      padding='xl'
      position='top'
      size={'100%'}
      withCloseButton={false}
      opened={isOpen}
      onClose={() => setIsOpen(false)}>
      <Box onClick={() => setIsOpen(false)} className='flex justify-end m-0 cursor-pointer'>
        <Iconify icon={'carbon:close-filled'} width={30} height={30} />
      </Box>

      <Box className='flex flex-col items-align-middle text-center mt-10'>
        <LinkToPage route='/signals' text='Home' setIsOpen={setIsOpen} />
        <LinkToPage route='/privacy' text='Privacy' setIsOpen={setIsOpen} />
        <LinkToPage route='/terms' text='Terms' setIsOpen={setIsOpen} />
        <LinkToPage route='/contact-us' text='Contact' setIsOpen={setIsOpen} />
      </Box>
    </Drawer>
  );
}

const useStyles = createStyles((theme) => ({
  root: {}
}));

type LinkProps = {
  route: string;
  text: string;
  setIsOpen: (isOpen: boolean) => void;
};

function LinkToPage({ route = '', text = '', setIsOpen }: LinkProps) {
  const { classes } = useStyles();
  return (
    <Link href={route} passHref>
      <Text onClick={() => setIsOpen(false)} className='mx-3 hover:opacity-95 my-10 text-xl' component='a'>
        {text}
      </Text>
    </Link>
  );
}
