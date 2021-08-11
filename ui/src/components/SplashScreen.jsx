import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';

const SplashScreen = ({ title, description, action }) => {
    const theme = useTheme();

    const content = (
        <Grid container direction="column" alignItems="center" spacing={2}>
            {title && (
                <Grid item>
                    <Typography variant="h5" textAlign="center">
                        {title}
                    </Typography>
                </Grid>
            )}

            {description && (
                <Grid item>
                    <Typography variant="body1" textAlign="center">
                        {description}
                    </Typography>
                </Grid>
            )}

            {action && <Grid item>{action}</Grid>}
        </Grid>
    );

    return (
        <Box
            position="fixed"
            left={0}
            top={0}
            right={0}
            bottom={0}
            zIndex={9999}
            bgcolor={theme.palette.background.default}
        >
            <Box display="flex" alignItems="center" minHeight="80vh">
                <Container>{content}</Container>
            </Box>
        </Box>
    );
};

SplashScreen.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    action: PropTypes.node,
};

SplashScreen.defaultProps = {
    title: '',
    description: '',
    action: null,
};

export default SplashScreen;
