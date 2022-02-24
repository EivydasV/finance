import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import SecurityIcon from '@mui/icons-material/Security'
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'
import Pagination from '@mui/material/Pagination'
const columns = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    editable: true,
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    editable: true,
    flex: 1,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    flex: 1,
    disableColumnMenu: true,
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    editable: true,
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: 'isAdmin',
    headerName: 'isAdmin',
    type: 'boolean',
    editable: true,
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
  },

  {
    field: 'actions',
    type: 'actions',
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem
        key={1}
        icon={<DeleteIcon />}
        label='Delete'
        color='error'
        // onClick={deleteUser(params.id)}
      />,
      <GridActionsCellItem
        key={2}
        icon={<SecurityIcon />}
        label='Toggle Admin'
        onClick={() => console.log(params.id)}
        showInMenu
      />,
    ],
  },
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, isAdmin: true },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

function CustomPagination() {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <Pagination
      color='secondary'
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  )
}

export default function CustomPaginationGrid() {
  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        pagination
        pageSize={7}
        rowsPerPageOptions={[5]}
        components={{
          Pagination: CustomPagination,
        }}
        row
        rows={rows}
        columns={columns}
      />
    </Box>
  )
}
