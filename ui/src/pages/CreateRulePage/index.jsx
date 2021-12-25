import React from 'react';
import ErrorSplashScreen from '../../components/ErrorSplashScreen';
import MockingRuleForm from '../../components/MockingRuleForm';
import Page from '../../components/Page';
import { useFetch } from '../../hooks/useFetch';

const CREATE_RULE_ROUTE = '/rule';

const CreateRulePage = () => {
    const { loading, hasError, data: tags } = useFetch('/api/tags');

    if (loading) {
        return null;
    }

    return (
        <Page title="Create mocking rule">
            {hasError && <ErrorSplashScreen />}

            {!hasError && (
                <>
                    <Page.Title showBackButton>Create mocking rule</Page.Title>
                    <MockingRuleForm tags={tags} />
                    <Page.Footer />
                </>
            )}
        </Page>
    );
};

export default CreateRulePage;
export { CREATE_RULE_ROUTE };
