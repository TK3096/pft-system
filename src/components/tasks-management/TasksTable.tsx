'use client'

import { Task } from '@/types'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface TasksTableProps {
  data: Task[]
  columns: ColumnDef<Task>[]
  pageSize?: number
}

export const TasksTable: React.FC<TasksTableProps> = (
  props: TasksTableProps,
) => {
  const { data, columns, pageSize = 10 } = props

  const router = useRouter()
  const searchParams = useSearchParams()

  const boardId = searchParams.get('b') || ''
  const groupId = searchParams.get('g') || ''

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: data.length,
    pageCount: Math.ceil(data.length / pageSize),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
  })

  const handleRowClick = (id: string) => {
    const url = qs.stringifyUrl({
      url: '/tasks-management',
      query: { t: id, g: groupId, b: boardId },
    })

    router.replace(url)
  }

  const handlePreviousePage = () => {
    table.previousPage()
  }

  const handleNextPage = () => {
    table.nextPage()
  }

  return (
    <div>
      <Table>
        <TableHeader className='dark:bg-neutral-900'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => handleRowClick(row.original.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='text-center'>
                No tasks found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Separator />
      <div className='flex items-center justify-end space-x-2 text-sm dark:bg-neutral-900'>
        <div className='mr-auto pl-3 text-muted-foreground'>
          Total <span className='text-white'>{data.length}</span> row(s)
        </div>
        <Button
          variant='ghost'
          size='sm'
          onClick={handlePreviousePage}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className='h-4 w-4 mr-1' />
          Previous
        </Button>
        <div>
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </div>
        <Button
          variant='ghost'
          size='sm'
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ChevronRightIcon className='h-4 w-4 ml-1' />
        </Button>
      </div>
    </div>
  )
}
