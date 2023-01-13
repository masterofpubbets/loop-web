import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const DataTable = ({ rows, columns, tableHeight }) => {
    return (
        <div style={{ height: tableHeight, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                components={{
                    Toolbar: GridToolbar,
                }}
            />
        </div>
    );
};

export default DataTable;
