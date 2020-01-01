import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useState, useEffect } from 'react'
//import authService from './api-authorization/AuthorizeService'

const columns = [
    {
        id: 'orderDate',
        label: 'Order Date',
        minWidth: 120
    },
    {
        id: 'orderNumber',
        label: 'Order Number',
        minWidth: 120
    },
    {
        id: 'cutomerName',
        label: 'Cutomer Name',
        minWidth: 150,
        align: 'center'
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 250,
        align: 'left'
    },
    {
        id: 'trackingStatus',
        label: 'Tracking Status',
        minWidth: 100,
        align: 'center'
    },
    {
        id: 'stockKeepingUnit',
        label: 'Sku',
        minWidth: 150,
        align: 'center'
    },
    {
        id: 'carrier',
        label: 'Carrier',
        minWidth: 100,
        align: 'center'
    },
    {
        id: 'trackingNumber',
        label: 'TrackingNumber',
        minWidth: 100,
        align: 'center'
    },
    {
        id: 'shipDate',
        label: 'Ship Date',
        minWidth: 100,
        align: 'center'
    }
];

//const token = authService.getAccessToken();

const useStyles = makeStyles({
    root: {
        width: '100%',
    }
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [data, setData] = useState([]); 
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    useEffect(() => {
        const GetData = async () => {
            const response = await fetch('api/OrderTest/GetAll');
            const records = await response.json();
            setData(records.data);
        }
        GetData();
        //console.log(data);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}