import { Cell, ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import { HeaderGroup, PaginationState, Row, SortingState, Table, useTableInstance } from '@tanstack/react-table';
import React from 'react';
import { ArrowDown, ArrowRight, ArrowUp } from 'tabler-icons-react';

export type IBaseTableProps = {
  columns: ColumnDef<any>[];
  data: any[];
  table: Table<any>;
};

export function BaseTable({ columns, data, table }: IBaseTableProps) {
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const instance = useTableInstance(table, {
    data,
    columns,
    state: { sorting, pagination, globalFilter },
    globalFilterFn: 'fuzzy',
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <>
      <div className=''>
        <input
          className='mb-3 min-w-[700px] z-table-border w-full py-[10px] px-3 focus:outline-blue-300 focus:shadow-outline bg-transparent'
          placeholder='Type a keyword to search...'
          type='text'
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(String(e.target.value))}
        />

        <div className='z-table-border border-x-transparent overflow-auto'>
          <table className='min-w-[700px] w-full border-transparent'>
            <thead>
              {instance.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                <tr className='bg-red-300 rounded-sm m-0 p-0 border-none' key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className='border-x rounded-sm border-gray-200 dark:border-gray-600 text-left text-sm text-gray-600 dark:text-gray-400 py-2 px-3 bg-gray-100 dark:bg-gray-800'>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort() ? 'cursor-pointer select-none flex items-center align-middle' : 'flex',
                            onClick: header.column.getToggleSortingHandler()
                          }}>
                          {header.renderHeader()}
                          {{
                            asc: <ArrowUp className='ml-1' />,
                            desc: <ArrowDown className='ml-1' />
                          }[header.column.getIsSorted() as string] ?? <ArrowRight className='ml-1 text-transparent' />}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {instance.getRowModel().rows.map((row: Row<any>) => (
                <tr key={row.id} className=''>
                  {row.getVisibleCells().map((cell: Cell<any>) => (
                    <td className='text-left py-2 px-3 border-gray-100 border' key={cell.id}>
                      {cell.renderCell()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* pagination */}
      <div className='flex justify-end items-center gap-2 mt-4'>
        <button
          className='z-table-border py-1 px-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-700 rounded-sm'
          onClick={() => instance.setPageIndex(0)}
          disabled={!instance.getCanPreviousPage()}>
          {'<<'}
        </button>
        <button
          className='z-table-border py-1 px-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-700 rounded-sm'
          onClick={() => instance.previousPage()}
          disabled={!instance.getCanPreviousPage()}>
          {'<'}
        </button>
        <button
          className='z-table-border py-1 px-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-700 rounded-sm'
          onClick={() => instance.nextPage()}
          disabled={!instance.getCanNextPage()}>
          {'>'}
        </button>
        <button
          className='z-table-border py-1 px-2 cursor-pointer  hover:bg-gray-100 hover:dark:bg-gray-700 rounded-sm'
          onClick={() => instance.setPageIndex(instance.getPageCount() - 1)}
          disabled={!instance.getCanNextPage()}>
          {'>>'}
        </button>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {instance.getState().pagination.pageIndex + 1} of {instance.getPageCount()}
          </strong>
        </span>

        <select
          className='z-table-border bg-transparent py-1 px-4 hover:bg-gray-100 cursor-pointer hover:dark:bg-gray-700 focus:outline-none rounded-sm'
          value={instance.getState().pagination.pageSize}
          onChange={(e) => {
            instance.setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
