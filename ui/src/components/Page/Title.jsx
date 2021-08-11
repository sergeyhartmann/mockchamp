import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import { Box, Button, Grid, Typography } from '@mui/material';

const Title = ({ showBackButton, action, children }) => {
    const history = useHistory();

    const backButton = (
        <Button startIcon={<NavigateBefore />} size="small" onClick={history.goBack}>
            Back
        </Button>
    );

    return (
        <>
            {showBackButton && <Box mb={2}>{backButton}</Box>}

            <Box mb={6}>
                {action && (
                    <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                        <Grid item>
                            <Typography variant="h4">{children}</Typography>
                        </Grid>
                        <Grid item>{action}</Grid>
                    </Grid>
                )}

                {!action && <Typography variant="h4">{children}</Typography>}
            </Box>
        </>
    );
};

Title.propTypes = {
    showBackButton: PropTypes.bool,
    action: PropTypes.node,
    children: PropTypes.string.isRequired,
};

Title.defaultProps = {
    action: null,
    showBackButton: false,
};

export default Title;
