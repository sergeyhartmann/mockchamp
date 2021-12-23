import React from 'react';
import { useParams } from 'react-router-dom';
import ErrorSplashScreen from '../../components/ErrorSplashScreen';
import MockingRuleForm from '../../components/MockingRuleForm';
import Page from '../../components/Page';
import { useFetch } from '../../hooks/useFetch';

const EDIT_RULE_ROUTE = '/rule/:id';

const EditRulePage = () => {
    const { id } = useParams();
    const { loading: ruleLoading, hasError: ruleHasError, data: rule } = useFetch(`/api/rule/${id}`);
    const { loading: tagsLoading, hasError: tagsHasError, data: tags } = useFetch(`/api/tags`);

    const loading = ruleLoading || tagsLoading;
    const hasError = ruleHasError || tagsHasError;

    if (loading) {
        return null;
    }

    return (
        <Page title="Edit mocking rule">
            {(hasError || !rule) && <ErrorSplashScreen />}

            {!hasError && rule && (
                <>
                    <Page.Title showBackButton>Edit mocking rule</Page.Title>
                    <MockingRuleForm rule={rule} tags={tags} />
                    <Page.Footer />
                </>
            )}
        </Page>
    );
};

export default EditRulePage;
export { EDIT_RULE_ROUTE };
