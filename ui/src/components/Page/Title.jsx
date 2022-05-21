import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import { Box, Button, Typography } from '@mui/material';

const Title = ({ showBackButton, children }) => {
    const history = useHistory();

    const backButton = (
        <Button startIcon={<NavigateBefore />} onClick={history.goBack}>
            Back
        </Button>
    );

    return (
        <>
            {showBackButton && <Box mb={2}>{backButton}</Box>}

            <Box mb={6}>
                <Typography variant="h4">{children}</Typography>
            </Box>
        </>
    );
};

Title.propTypes = {
    showBackButton: PropTypes.bool,
    children: PropTypes.string.isRequired,
};

Title.defaultProps = {
    showBackButton: false,
};

export default Title;
