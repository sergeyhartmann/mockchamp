import { useState } from 'react';

const useTablePagination = (defaultRowsPerPage, defaultPage) => {
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [page, setPage] = useState(defaultPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return { rowsPerPage, page, handleChangeRowsPerPage, handleChangePage };
};

export { useTablePagination };
