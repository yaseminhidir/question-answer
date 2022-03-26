import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationSize({pagination, onPageChange}) {

  return (
    <Stack spacing={2}>
      <Pagination count={pagination.pageCount} onChange={onPageChange} size="small" />
    </Stack>
  );
}