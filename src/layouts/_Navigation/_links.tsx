import Iconify from '../../components/others/Iconify';

const iconWidthHeight = 22;

const adminNavbarLinks = [
  {
    subheader: 'general',
    items: [
      {
        title: 'Prayers Requests',
        path: '/prayers',
        icon: <Iconify icon={'fa-solid:pray'} width={iconWidthHeight} height={iconWidthHeight} />
      },
      {
        title: 'Events',
        path: '/events',
        icon: <Iconify icon={'carbon:event-schedule'} width={iconWidthHeight} height={iconWidthHeight} />,
        children: [
          { title: 'List', path: '/events' },
          { title: 'Create', path: '/events/create' }
        ]
      },
      {
        title: 'Locations',
        path: '/locations',
        icon: <Iconify icon={'ic:baseline-gps-fixed'} width={iconWidthHeight} height={iconWidthHeight} />,
        children: [
          { title: 'List', path: '/locations' },
          { title: 'Create', path: '/locations/create' }
        ]
      },
      {
        title: 'Notifications',
        path: '/notifications',
        icon: <Iconify icon={'carbon:notification-filled'} width={iconWidthHeight} height={iconWidthHeight} />,
        children: [
          { title: 'List', path: '/notifications' },
          { title: 'Create', path: '/notifications/create' }
        ]
      },
      {
        title: 'Feedback',
        path: '/feedback',
        icon: <Iconify icon={'akar-icons:comment'} width={iconWidthHeight} height={iconWidthHeight} />
      }
    ]
  }
];

export { adminNavbarLinks };
