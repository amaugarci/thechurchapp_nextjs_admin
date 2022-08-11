import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

import SignInPage from '../pages/auth/signin';
import { useAppDispatch, useAppSelector } from '../models_store/_store';
import { initializeFirebase } from '../_firebase/firebase';
import { sagaTypes } from '../models_store/_saga';
import { LoadingScreen } from '../components/others/LoadingScreen';
import ResetPasswordPage from '../pages/auth/reset-password';

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.firebaseAuth);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    await initializeFirebase();
    dispatch({ type: sagaTypes.STREAM_AUTH_STATECHANGE });
  }

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated && pathname.includes('/reset-password')) {
    if (pathname !== requestedLocation) setRequestedLocation(pathname);
    return <ResetPasswordPage />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) setRequestedLocation(pathname);
    return <SignInPage />;
  }

  return <>{children}</>;
}
