import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';

const transformHeadersToRows = (headers) => {
    const entries = Object.entries(headers);

    const rows = entries.map(([key, value]) => {
        return { key, value };
    });

    rows.push({ key: '', value: '' }); // add empty row to end

    return rows;
};

const transformRowsToHeaders = (rows) => {
    const entries = rows
        .filter(({ key, value }) => key.length > 0 && value.length > 0)
        .map(({ key, value }) => {
            return [key, value];
        });

    return Object.fromEntries(entries);
};

const ResponseHeaders = ({ headers, onChange }) => {
    const [rows, setRows] = useState(transformHeadersToRows(headers));

    const changeHandler = (index, target) => {
        return (event) => {
            const rowsCopy = [...rows];
            rowsCopy[index][target] = event.target.value;

            const isLastRow = index === rows.length - 1;
            const isEmptyRow = rowsCopy[index].key === '' && rowsCopy[index].value === '';

            if (!isLastRow && isEmptyRow) {
                rowsCopy.splice(index, 1); // delete empty row except last
            }

            if (isLastRow && !isEmptyRow) {
                rowsCopy.push({ key: '', value: '' }); // add empty row to end
            }

            setRows(rowsCopy);

            onChange(transformRowsToHeaders(rowsCopy));
        };
    };

    return (
        <Paper elevation={4}>
            <Box p={2}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography color="textSecondary">Response headers</Typography>
                    </Grid>

                    {rows.map((row, index) => (
                        <Grid key={index} item container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    placeholder="Key"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={row.key}
                                    onChange={changeHandler(index, 'key')}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    placeholder="Value"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={row.value}
                                    onChange={changeHandler(index, 'value')}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
};

ResponseHeaders.propTypes = {
    headers: PropTypes.objectOf(PropTypes.string),
    onChange: PropTypes.func,
};

ResponseHeaders.defaultProps = {
    headers: {},
    onChange: () => {},
};

export default ResponseHeaders;
