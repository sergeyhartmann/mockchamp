import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography } from '@mui/material';

const InputGroupContainer = ({ title, children }) => {
    return (
        <Paper>
            <Box p={4}>
                <Typography mb={2} fontWeight={500}>
                    {title}
                </Typography>
                {children}
            </Box>
        </Paper>
    );
};

InputGroupContainer.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default InputGroupContainer;
