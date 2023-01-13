import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationControlled = ({ dataLength, itemsPerPage, returnedPage }) => {
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(10);


    const handleChange = (e, value) => {
        e.preventDefault();
        setPage(value);

    };

    useEffect(() => {
        setPageCount(((dataLength % itemsPerPage) > 0 ? 1 : 0) + Math.trunc(dataLength / itemsPerPage))
    }, [dataLength, itemsPerPage]);

    useEffect(() => {
        returnedPage(page);
    }, [page]);

    return (
        <Stack spacing={2}>
            <Typography>Page: {page}</Typography>
            <Pagination count={pageCount} page={page} onChange={handleChange} color="primary" />
        </Stack>
    );
};

export default PaginationControlled;
