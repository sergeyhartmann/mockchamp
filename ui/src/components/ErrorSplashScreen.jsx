import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { HOME_PAGE_ROUTE } from '../pages/HomePage';
import SplashScreen from './SplashScreen';

const ErrorSplashScreen = () => {
    const history = useHistory();

    const actions = (
        <Grid container justifyContent="center" spacing={2}>
            <Grid item>
                <Button variant="outlined" color="primary" onClick={() => window.location.reload()}>
                    Reload page
                </Button>
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={() => history.push(HOME_PAGE_ROUTE)}>
                    Go to homepage
                </Button>
            </Grid>
        </Grid>
    );

    return (
        <SplashScreen
            title="Oops! Something went wrong"
            description="Please try to reload the page or go to homepage, it usually helps ;)"
            action={actions}
        />
    );
};

export default ErrorSplashScreen;
