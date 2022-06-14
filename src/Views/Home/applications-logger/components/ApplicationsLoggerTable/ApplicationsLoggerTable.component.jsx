import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableRow,
    TableBody,
    TableHead,
    TableCell,
    TableSortLabel,
} from "@mui/material";
import {Pagination, Skeleton} from "@mui/lab";
import './ApplicationsLoggerTable.style.scss';

/**
 * @author Abdallah Yassin (abdallah-yassin@outlook.com)
 * @Description A component to handle the table header sorting
 */
const EnhancedTableHead = ({order, orderBy, onRequestSort, columns}) => {
    /**
     * @author Abdallah Yassin (abdallah-yassin@outlook.com)
     * @Description A method to handle the sort data to the parent
     */
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map((headCell) => (
                    <TableCell
                        key={headCell.key}
                        sortDirection={orderBy === headCell.dataKey ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.dataKey}
                            onClick={createSortHandler(headCell.dataKey)}
                            direction={orderBy === headCell.dataKey ? order : 'asc'}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    columns: PropTypes.object
};

export const ApplicationsLoggerTable = ({data, isApplicationsLoading, getFilteredDataHandler, filterValue}) => {
    const [orderBy, setOrderBy] = useState('logId');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [columns] = useState(() => [
        {key: 0, label: 'Log ID', dataKey: 'logId'},
        {key: 1, label: 'Application Type', dataKey: 'applicationType'},
        {key: 2, label: 'Application ID', dataKey: 'applicationId'},
        {key: 3, label: 'Action', dataKey: 'actionType'},
        {key: 4, label: 'Action Details', dataKey: ''},
        {key: 5, label: 'Date : Time', dataKey: 'creationTimestamp'},
    ]);

    /**
     * @author Abdallah Yassin (abdallah-yassin@outlook.com)
     * @Description A method to handle the page change from the pagination component
     */
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    /**
     * @author Abdallah Yassin (abdallah-yassin@outlook.com)
     * @Description A method to handle the received data from the header child component and calculates the order
     */
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    /**
     * @author Abdallah Yassin (abdallah-yassin@outlook.com)
     * @Description A method to compare between the order of the items
     */
    const descendingComparator = (firstItem, secondItem, orderBy) => {
        if (secondItem[orderBy] < firstItem[orderBy]) return -1;
        if (secondItem[orderBy] > firstItem[orderBy]) return 1;

        return 0;
    };

    /**
     * @author Abdallah Yassin (abdallah-yassin@outlook.com)
     * @Description This method is created for cross-browser compatibility, if you don't
     * need to support IE11, you can use Array.prototype.sort() directly
     */
    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);

        stabilizedThis.sort((firstItem, secondItem) => {
            const order = comparator(firstItem[0], secondItem[0]);
            if (order !== 0) {
                return order;
            }
            return firstItem[1] - secondItem[1];
        });

        return stabilizedThis.map((el) => el[0]);
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (firstItem, secondItem) => descendingComparator(firstItem, secondItem, orderBy)
            : (firstItem, secondItem) => -descendingComparator(firstItem, secondItem, orderBy);
    };

    return (
        <div className="applications-logger-table-wrapper">
            <Table>
                <EnhancedTableHead
                    order={order}
                    columns={columns}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                    {!isApplicationsLoading &&
                        data &&
                        stableSort(data, getComparator(order, orderBy))
                            .slice((page * rowsPerPage), (page * rowsPerPage) + (rowsPerPage + filterValue))
                            .filter(row => getFilteredDataHandler(row))
                            .map((row, index) => (
                                <TableRow hover tabIndex={-1} key={`${row.logId}-${index + 1}`}>
                                    {columns.map((column) => {
                                        const value =
                                            row[column.dataKey] || <span className="placeholder-char">- / -</span>;

                                        return (
                                            <TableCell key={`${column.key + 1}-table-cell`}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                </TableBody>
            </Table>
            {isApplicationsLoading &&
                Array.from({length: 10}).map((item, index) => <Skeleton key={index} variant="rect"/>)
            }
            {!filterValue &&
                <Pagination
                    page={page || 0}
                    onChange={handleChangePage}
                    count={((data.filter(row => getFilteredDataHandler(row)).length / rowsPerPage) - 1).toFixed() || 0}
                />
            }
        </div>
    );
};

ApplicationsLoggerTable.propTypes = {
    filterValue: PropTypes.number.isRequired,
    data: PropTypes.instanceOf(Array).isRequired,
    isApplicationsLoading: PropTypes.bool.isRequired,
    getFilteredDataHandler: PropTypes.func.isRequired,
};

