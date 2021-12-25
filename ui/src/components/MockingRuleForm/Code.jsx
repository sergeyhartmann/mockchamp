import React from 'react';
import PropTypes from 'prop-types';
import { Typography, useTheme } from '@mui/material';

const Code = ({ children }) => {
    const theme = useTheme();

    return (
        <Typography component="span" variant="body2" sx={{ background: theme.palette.background.default }}>
            {children}
        </Typography>
    );
};

Code.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Code;
