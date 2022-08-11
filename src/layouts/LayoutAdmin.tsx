import { AppShell, Box, Burger, Group, Header, Navbar, Text } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AuthMenu } from '../components/others/AuthMenu';
import AuthGuard from '../guards/AuthGuard';
import { openDrawer } from '../models_store/appSlice';
import { sagaTypes } from '../models_store/_saga';
import { useAppDispatch } from '../models_store/_store';
import DrawerAdmin from './_Navigation/DrawerAdmin';
import { NavSidebar } from './_Navigation/NavSideBar';
import { adminNavbarLinks } from './_Navigation/_links';

type Props = {
  children: React.ReactNode;
};

export default function LayoutAdmin({ children }: Props) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    startStreams();
  }, []);

  async function startStreams() {
    dispatch({ type: sagaTypes.STREAM_EVENTS });
    dispatch({ type: sagaTypes.STREAM_LOCATIONS });
    dispatch({ type: sagaTypes.STREAM_FEEDBACKS });
    dispatch({ type: sagaTypes.STREAM_NOTIFICATIONS });
    dispatch({ type: sagaTypes.STREAM_PRAYERS });
  }

  return (
    <AuthGuard>
      <DrawerAdmin />
      <AppShell
        className='dark:bg-black dark:text-white'
        padding='md'
        fixed
        header={
          <Header height={70} className='dark:bg-black h-full flex pr-4'>
            <div className='xs:flex md:hidden justify-center items-center ml-4'>
              <Burger
                opened={isOpenDrawer}
                onClick={() => {
                  dispatch(openDrawer());
                }}
                size='sm'
              />
            </div>

            <Link href={'/signals'}>
              <Group className='cursor-pointer ml-4' spacing={0} align='center'>
                <img src='/images/logo.png' className='w-[30px]' />
                <Text className='ml-2 font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0'>
                  Avivamiento
                </Text>
              </Group>
            </Link>

            <Box sx={{ flexGrow: 1 }} />
            <AuthMenu />
          </Header>
        }
        navbar={
          <div className='xs:hidden md:flex'>
            <Navbar p='xs' width={{ md: 260 }} className='dark:bg-black dark:text-white'>
              <NavSidebar navConfig={adminNavbarLinks} />
            </Navbar>
          </div>
        }>
        {children}
      </AppShell>
    </AuthGuard>
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
