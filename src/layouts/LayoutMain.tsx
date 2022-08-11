import { AppShell, Box, Burger, Container, Footer, Group, Header, MediaQuery, Text, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ColorSchemeToggle } from '../components/others/ColorSchemeToggle';
import { sagaTypes } from '../models_store/_saga';
import { useAppDispatch } from '../models_store/_store';
import { APP_NAME } from '../utils/app_constants';
import DrawerMain from './_Navigation/DrawerMain';

type Props = {
  children: React.ReactNode;
};

export default function LayoutMain({ children }: Props) {
  const theme = useMantineTheme();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <>
      <DrawerMain isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer} />
      <AppShell
        className='dark:bg-black dark:text-white'
        padding='md'
        fixed
        header={
          <Header height={70} p='md' className='dark:bg-black border-0'>
            <Container size='xl' className='flex justify-center align-middle h-full'>
              <Link href={'/signals'}>
                <Group className='cursor-pointer' spacing={0} align='center'>
                  <img src='/images/logo.png' className='mb-1 w-[30px]' />
                  <Text className='ml-2 font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0'>
                    Avivamiento
                  </Text>
                </Group>
              </Link>

              <Box sx={{ flexGrow: 1 }} />
              <ColorSchemeToggle />

              <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
                <Group>
                  <LinkToPage route='/signals' text='Home' />
                  <LinkToPage route='/privacy' text='Privacy' />
                  <LinkToPage route='/terms' text='Terms' />
                  <LinkToPage route='/contact-us' text='Contact' />
                </Group>
              </MediaQuery>

              <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <Burger
                  opened={isOpenDrawer}
                  onClick={() => {
                    setIsOpenDrawer((o) => !o);
                  }}
                  size='sm'
                  color={theme.colors.gray[6]}
                />
              </MediaQuery>
            </Container>
          </Header>
        }
        footer={
          <Footer className='flex items-center justify-center dark:bg-black h-full border-0' height={60}>
            <Text className='mr-2 text-sm'>`© 2022 Avivamiento | Designed Codememory`</Text>
            <ColorSchemeToggle />
          </Footer>
        }>
        {children}
      </AppShell>
    </>
  );
}

function LinkToPage({ route = '', text = '' }) {
  return (
    <Link href={route} passHref>
      <Text className='mx-3 hover:opacity-95' component='a'>
        {text}
      </Text>
    </Link>
  );
}
