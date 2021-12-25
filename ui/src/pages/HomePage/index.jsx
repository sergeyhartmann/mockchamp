import React from 'react';
import { useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Button, Link, Stack } from '@mui/material';
import ErrorSplashScreen from '../../components/ErrorSplashScreen';
import Page from '../../components/Page';
import { useFetch } from '../../hooks/useFetch';
import { CREATE_RULE_ROUTE } from '../CreateRulePage';
import FilterByTags from './FilterByTags';
import MockingRule from './MockingRule';
import WelcomeSplashScreen from './WelcomeSplashScreen';
import { downloadObjectAsJson } from './download';
import { useFilterByTags } from './useFilterByTags';

const HOME_PAGE_ROUTE = '/';

const HomePage = () => {
    const history = useHistory();
    const { loading: rulesLoading, hasError: rulesHasError, data: rules } = useFetch('/api/rules');
    const { loading: tagsLoading, hasError: tagsHasError, data: tags } = useFetch('/api/tags');
    const { filter, onSelectedTagChange } = useFilterByTags();

    const loading = rulesLoading || tagsLoading;
    const hasError = rulesHasError || tagsHasError;

    const buttonAddMockingRule = (
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => history.push(CREATE_RULE_ROUTE)}>
            Add mocking rule
        </Button>
    );

    const actions = (
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Link component="button" onClick={() => downloadObjectAsJson(rules, 'rules')}>
                Export JSON
            </Link>
        </Stack>
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

                    <Stack spacing={2}>
                        <FilterByTags tags={tags} onSelect={onSelectedTagChange} />

                        {actions}

                        {filter(rules).map((rule) => (
                            <MockingRule key={rule.id} rule={rule} />
                        ))}
                    </Stack>

                    <Page.Footer />
                </>
            )}
        </Page>
    );
};

export default HomePage;
export { HOME_PAGE_ROUTE };
