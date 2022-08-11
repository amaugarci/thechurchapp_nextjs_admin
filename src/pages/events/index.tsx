import { Box, Button, Container, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { NextLink } from '@mantine/next';
import { showNotification } from '@mantine/notifications';
import { compareItems, RankingInfo, rankings, rankItem } from '@tanstack/match-sorter-utils';
import { createTable, sortingFns } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { Edit, Trash } from 'tabler-icons-react';
import Page from '../../components/others/Page';
import { BaseTable } from '../../components/tables/BaseTable';
import Layout from '../../layouts';
import { Event } from '../../models/model.event';
import { apiDeleteEvent, apiDeleteNotification } from '../../models_services/firestore_service';
import { useAppSelector } from '../../models_store/_store';
import { fDateTimeSuffix } from '../../utils/formatTime';

const table = createTable()
  .setRowType<Event>()
  .setFilterMetaType<RankingInfo>()
  .setOptions({
    filterFns: {
      fuzzy: (row, columnId, value, addMeta) => {
        const itemRank = rankItem(row.getValue(columnId), value, {
          threshold: rankings.MATCHES
        });
        addMeta(itemRank);
        return itemRank.passed;
      }
    },
    sortingFns: {
      fuzzy: (rowA, rowB, columnId) => {
        let dir = 0;
        if (rowA.columnFiltersMeta[columnId]) {
          dir = compareItems(rowA.columnFiltersMeta[columnId]!, rowB.columnFiltersMeta[columnId]!);
        }
        return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
      }
    }
  });

export default function NotificationsIndexPage() {
  function TableActions(id: string) {
    const router = useRouter();
    const modals = useModals();

    const handleDelete = async (modalId: string) => {
      modals.closeModal(modalId);
      try {
        await apiDeleteEvent(id);
        showNotification({ title: 'Success', message: 'Event deleted', autoClose: 6000 });
      } catch (error) {
        showNotification({ color: 'red', title: 'Error', message: 'There was an error deleting the event', autoClose: 6000 });
      }
    };

    const openDeleteModal = () => {
      const modalId = modals.openModal({
        title: 'Are you sure you want to proceed?',
        centered: true,
        children: (
          <>
            <Text size='sm'>Delete this event? This action cannot be undone.</Text>
            <Box className='mt-6 flex justify-end'>
              <Button variant='outline' className='w-min mx-2' fullWidth onClick={() => modals.closeModal(modalId)} mt='md'>
                No don't delete it
              </Button>

              <Button className=' w-min btn-delete mx-2' fullWidth onClick={() => handleDelete(modalId)} mt='md'>
                Delete event
              </Button>
            </Box>
          </>
        )
      });
    };

    return (
      <Box className='flex'>
        <Edit className='cursor-pointer text-yellow-400 mr-4' onClick={() => router.push(`/events/${id}`)} />{' '}
        <Trash className='cursor-pointer text-red-400' onClick={openDeleteModal} />
      </Box>
    );
  }

  const columns = React.useMemo(
    () => [
      table.createDataColumn('name', {
        header: () => <span>Name</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      table.createDataColumn('description', {
        header: () => <span>Description</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      table.createDataColumn('location', {
        header: () => <span>Location</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      table.createDataColumn('link', {
        header: () => <span>Link</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      table.createDataColumn('eventDateTime', {
        header: () => <span>Date</span>,
        cell: (info) => fDateTimeSuffix(info.getValue()),
        footer: (props) => props.column.id
      }),
      table.createDataColumn('imageUrl', {
        header: () => <span>Image</span>,
        cell: (info) => (
          <Box>
            <img className='h-[50px] w-[100px] rounded-lg' src={`${info.getValue()}`} alt='' />
          </Box>
        ),
        footer: (props) => props.column.id
      }),
      table.createDataColumn('timestampCreated', {
        header: () => <span>Created</span>,
        cell: (info) => fDateTimeSuffix(info.getValue()),
        footer: (props) => props.column.id
      }),
      table.createDataColumn('id', {
        header: 'Actions',
        cell: (info) => TableActions(info.getValue()),
        enableSorting: false,
        footer: (props) => props.column.id
      })
    ],
    []
  );

  const { events } = useAppSelector((state) => state.firestore);

  return (
    <Page title='Contact'>
      <Container size='xl' className=''>
        <Box className='flex text-center justify-between items-center mt-20 mb-20'>
          <Text className='text-3xl font-semibold leading-10'>Events</Text>
          <NextLink href='/events/create'>
            <Button type='submit' variant='white' className='btn bg-yellow-500'>
              New event
            </Button>
          </NextLink>
        </Box>
        <BaseTable data={events} columns={columns} table={table} />
      </Container>
    </Page>
  );
}

NotificationsIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='admin'>{page}</Layout>;
};
