import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Tooltip,
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

    const getPath = (path = '') => {
        if (path.length < 55) {
            return path;
        }

        return (
            <Stack direction="row" alignItems="center">
                <Tooltip title={path}>
                    <Typography variant="body2">{path.substring(0, 55) + '...'}</Typography>
                </Tooltip>
                <IconButton size="small" onClick={() => navigator.clipboard.writeText(path)}>
                    <ContentCopyIcon htmlColor={theme.palette.text.secondary} sx={{ fontSize: '16px' }} />
                </IconButton>
            </Stack>
        );
    };

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

                                <TableCell sx={{ width: '100%' }}>{getPath(rule.request.path)}</TableCell>

                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        onClick={() => history.push(EDIT_RULE_ROUTE.replace(':id', rule.id))}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
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
