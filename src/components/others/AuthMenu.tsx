import { Menu, Divider, Text, useMantineColorScheme, Button } from '@mantine/core';
import { Settings, Search, Photo, MessageCircle, Trash, ArrowsLeftRight, User } from 'tabler-icons-react';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { ActionIcon } from '@mantine/core';
import { signOut } from '../../models_services/firebase_auth_services';

export function AuthMenu() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Menu
      className='flex items-center mr-2'
      control={
        <ActionIcon>
          <User />
        </ActionIcon>
      }>
      <Menu.Label>Profile</Menu.Label>
      <Divider />

      <Menu.Item className='mt-2' icon={<ArrowsLeftRight size={14} />} onClick={() => toggleColorScheme()}>
        Switch Theme
      </Menu.Item>
      <Menu.Item className='mt-2 mb-2' color='red' icon={<Settings size={14} />} onClick={() => signOut()}>
        Sign out
      </Menu.Item>
    </Menu>
  );
}
