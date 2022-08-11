import { ReactNode } from 'react';
import LayoutAdmin from './LayoutAdmin';
import LayoutMain from './LayoutMain';
import LogoOnlyLayout from './LogoOnlyLayout';

type Props = {
  children: ReactNode;
  variant?: 'main' | 'logoOnly' | 'admin';
};

export default function Layout({ children, variant = 'admin' }: Props) {
  if (variant === 'main') {
    return <LayoutMain>{children}</LayoutMain>;
  }
  if (variant === 'admin') {
    return <LayoutAdmin>{children}</LayoutAdmin>;
  }

  return <LogoOnlyLayout>{children}</LogoOnlyLayout>;
}
