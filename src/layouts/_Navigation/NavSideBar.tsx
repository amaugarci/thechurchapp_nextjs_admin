import { Box, Navbar, ScrollArea, Text, UnstyledButton } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';
import Iconify from '../../components/others/Iconify';

import { NavListProps, NavSectionProps } from './_types';

export function NavSidebar({ navConfig }: NavSectionProps) {
  return (
    <Navbar.Section grow component={ScrollArea} mx='-xs' px='xs' className='text-gray-500'>
      {navConfig.map((group) => (
        <Box key={group.subheader} className='mb-5 pt-5 px-2'>
          <Text className='mb-6 text-xs font-bold ml-2'>{group.subheader.toUpperCase()}</Text>
          {group.items.map((item) => (
            <div key={item.title} className='my-3'>
              <NavSidebarList key={item.title} item={item} />
            </div>
          ))}
        </Box>
      ))}
    </Navbar.Section>
  );
}

type NavSidebarListProps = {
  item: NavListProps;
};

function NavSidebarList({ item }: NavSidebarListProps) {
  const hasChildren = item.children && item.children.length > 0;
  const { title, path, icon } = item;
  if (hasChildren) return <NavSidebarListChildren item={item} />;
  return <NavSidebarListItem title={title} icon={icon} path={path} />;
}

function NavSidebarListChildren({ item }: NavSidebarListProps) {
  const { pathname, asPath } = useRouter();
  const active = getActive(item.path, pathname, asPath);
  const hasChildren = item.children && item.children.length > 0;
  const { title, path, icon, children } = item;
  if (hasChildren)
    return (
      <div className='my-3 '>
        <NextLink href={path}>
          <UnstyledButton
            className={`mb-1 flex items-center w-full p-0 h-10 pl-2 rounded-md  ${
              active ? 'hover:bg-slate-50 dark:bg-slate-800 text-yellow-400 ' : 'text-gray-500 dark:text-gray-400'
            }  hover:bg-slate-50 hover:dark:bg-slate-900`}>
            {icon} <Text className='ml-2'>{title}</Text> <Iconify className='ml-2' icon='chevron-right' />
          </UnstyledButton>
        </NextLink>

        {(item.children || []).map((child) => (
          <NavSidebarListChildren key={child.title} item={child} />
        ))}
      </div>
    );
  return <NavSidebarListChildrenItem title={title} icon={icon} path={path} />;
}

function NavSidebarListItem({ title, path, icon }: NavListProps) {
  const { pathname, asPath } = useRouter();
  const active = getActive(path, pathname, asPath);

  return (
    <NextLink href={path}>
      <UnstyledButton
        className={`flex items-center p-0 pl-2 w-full h-10 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900  ${
          active ? 'dark:bg-gray-900 text-yellow-400' : 'text-gray-500 dark:text-gray-400'
        }`}>
        {icon} <Text className='ml-2'>{title}</Text>
      </UnstyledButton>
    </NextLink>
  );
}

function NavSidebarListChildrenItem({ title, path, icon }: NavListProps) {
  const { pathname, asPath } = useRouter();
  const active = getPath(path, pathname);
  return (
    <NextLink href={path}>
      <UnstyledButton
        className={`flex items-center w-full p-0 h-10 pl-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 ${
          active ? ' text-yellow-400' : 'text-gray-500 dark:text-gray-400'
        }`}>
        <Iconify icon={'ci:dot-03-m'} width={20} height={20} /> <Text className='pl-3'>{title}</Text>
      </UnstyledButton>
    </NextLink>
  );
}

export function getActive(path: string, pathname: string, asPath: string) {
  return pathname.includes(path) || asPath.includes(path);
}
export function getPath(path: string, pathname: string) {
  return pathname == path;
}
