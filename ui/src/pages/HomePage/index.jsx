import React from 'react';
import { useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import ErrorSplashScreen from '../../components/ErrorSplashScreen';
import Page from '../../components/Page';
import { useFetch } from '../../hooks/useFetch';
import { CREATE_RULE_ROUTE } from '../CreateRulePage';
import MockingRuleList from './MockingRuleList';
import WelcomeSplashScreen from './WelcomeSplashScreen';

const HOME_PAGE_ROUTE = '/';

const HomePage = () => {
    const history = useHistory();
    const { loading, hasError, data: rules } = useFetch('/api/rules');

    const buttonAddMockingRule = (
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => history.push(CREATE_RULE_ROUTE)}>
            Add mocking rule
        </Button>
    );

    if (loading) {
        return null;
    }

    return (
        <Page title="Mocking rules">
            {hasError && <ErrorSplashScreen />}

            {!hasError && rules?.length === 0 && <WelcomeSplashScreen />}

            {!hasError && rules?.length > 0 && (
                <>
                    <Page.Title action={buttonAddMockingRule}>Mocking rules</Page.Title>
                    <MockingRuleList rules={rules} />
                    <Page.Footer />
                </>
            )}
        </Page>
    );
};

export default HomePage;
export { HOME_PAGE_ROUTE };
