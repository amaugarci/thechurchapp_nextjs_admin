import { AppShell, Box, Footer, Group, Header, Text } from '@mantine/core';
import Link from 'next/link';
import { ColorSchemeToggle } from '../components/others/ColorSchemeToggle';
import { APP_NAME } from '../utils/app_constants';

type Props = {
  children: React.ReactNode;
};

export default function LogoOnlyLayout({ children }: Props) {
  return (
    <AppShell
      className='dark:bg-black dark:text-white'
      padding='md'
      fixed
      header={
        <Header height={70} p='md' className='dark:bg-black border-0'>
          <Box className='flex justify-center align-middle h-full'>
            <Link href={'/signals'}>
              <Group className='cursor-pointer' spacing={0} align='center'>
                <img src='/images/logo.png' width={30} className='mb-1 w-[30px]' />
                <Text className='ml-2 font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0'>
                  Avivamiento
                </Text>
              </Group>
            </Link>

            <Box sx={{ flexGrow: 1 }} />
            <ColorSchemeToggle />
          </Box>
        </Header>
      }
      // footer={
      //   <Footer className='flex items-center justify-center dark:bg-black h-full border-0' height={60}>
      //     <Text className='mr-2 text-sm'>`© 2022 Avivamiento | Designed Codememory`</Text>
      //     <ColorSchemeToggle />
      //   </Footer>
      // }
    >
      {children}
    </AppShell>
  );
}
