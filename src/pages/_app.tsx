import { GetServerSidePropsContext, NextPage } from 'next';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import MotionLazyContainer from '../components/framer_motion/MotionLazyContainer';
import { Provider } from 'react-redux';
import { store } from '../models_store/_store';
import { ModalsProvider } from '@mantine/modals';

import '../../styles/global.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { APP_NAME } from '../utils/app_constants';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export default function App(props: MyAppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const [isLoading, setIsLoading] = useState(true);
  const getLayout = Component.getLayout ?? ((page) => page);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  useEffect(() => {
    const isDark = getCookie('mantine-color-scheme') || 'dark';

    if (isDark === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorScheme]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <div></div>;

  return (
    <>
      <Head>
        <title>`Avivamiento`</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <link rel='shortcut icon' href='/favicon.svg' />
      </Head>

      <Provider store={store}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS withCSSVariables>
              <NotificationsProvider>
                <MotionLazyContainer>
                  {/*  */}
                  {getLayout(<Component {...pageProps} />)}
                  {/*  */}
                </MotionLazyContainer>
              </NotificationsProvider>
            </MantineProvider>
          </ModalsProvider>
        </ColorSchemeProvider>
      </Provider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark'
});
