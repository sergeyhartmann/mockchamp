import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography } from '@mui/material';

const InputGroupContainer = ({ title, children }) => {
    return (
        <Paper elevation={2}>
            <Box p={4}>
                {title && (
                    <Typography mb={4} fontWeight={500}>
                        {title}
                    </Typography>
                )}
                {children}
            </Box>
        </Paper>
    );
};

InputGroupContainer.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

InputGroupContainer.defaultProps = {
    title: '',
};

export default InputGroupContainer;
