import React from 'react';
import { useHistory } from 'react-router-dom';
import NavigateNext from '@mui/icons-material/NavigateNext';
import { Button } from '@mui/material';
import SplashScreen from '../../components/SplashScreen';
import { CREATE_RULE_ROUTE } from '../CreateRulePage';

const WelcomeSplashScreen = () => {
    const history = useHistory();

    const button = (
        <Button
            variant="contained"
            color="primary"
            endIcon={<NavigateNext />}
            onClick={() => history.push(CREATE_RULE_ROUTE)}
        >
            Create mocking rule
        </Button>
    );

    return (
        <SplashScreen
            title="Create first mocking rule"
            description="In future you can change or delete it."
            action={button}
        />
    );
};

export default WelcomeSplashScreen;
