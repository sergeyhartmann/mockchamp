import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import Page from '../components/Page';
import SplashScreen from '../components/SplashScreen';
import { HOME_PAGE_ROUTE } from './HomePage';

const NotFoundPage = () => {
    const history = useHistory();

    const button = (
        <Button variant="contained" color="primary" onClick={() => history.push(HOME_PAGE_ROUTE)}>
            Go to homepage
        </Button>
    );

    return (
        <Page title="Oops! Page Not Found">
            <SplashScreen title="Oops! Page Not Found" description="Please go to homepage." action={button} />
        </Page>
    );
};

export default NotFoundPage;
