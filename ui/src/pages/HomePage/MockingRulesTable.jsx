import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';
import { getPathConditionLabel, mockingRulePropType } from '../../models/mockingRule';
import { EDIT_RULE_ROUTE } from '../EditRulePage';
import { useTablePagination } from './useTablePagination';

const MockingRulesTable = ({ rules }) => {
    const theme = useTheme();
    const history = useHistory();
    const { rowsPerPage, page, handleChangeRowsPerPage, handleChangePage } = useTablePagination(10, 0);

    const style = {
        '& tbody > tr:not(:last-child)': { borderBottom: `1px solid ${theme.palette.divider}` },
        '& tbody > tr > td': { borderBottom: 'none' },
    };

    const action = (rule) => (
        <IconButton size="small" onClick={() => history.push(EDIT_RULE_ROUTE.replace(':id', rule.id))}>
            <EditIcon fontSize="small" />
        </IconButton>
    );

    return (
        <Box>
            <TableContainer component={Paper} elevation={2}>
                <Table sx={style}>
                    <TableBody>
                        {rules.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rule) => (
                            <TableRow key={rule.id}>
                                <TableCell>
                                    <Typography variant="caption" color="textSecondary">
                                        {rule.request.method}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography variant="caption" color="textSecondary">
                                        {getPathConditionLabel(rule.request.pathCondition)}
                                    </Typography>
                                </TableCell>

                                <TableCell sx={{ width: '100%' }}>{rule.request.path}</TableCell>

                                <TableCell align="right">{action(rule)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                rowsPerPageOptions={[10, 25, 100]}
                rowsPerPage={rowsPerPage}
                page={page}
                count={rules.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

MockingRulesTable.propTypes = {
    rules: PropTypes.arrayOf(PropTypes.shape(mockingRulePropType)).isRequired,
};

export default MockingRulesTable;
