import React from 'react';
import MockingRuleForm from '../../components/MockingRuleForm';
import Page from '../../components/Page';

const CREATE_RULE_ROUTE = '/rule';

const CreateRulePage = () => {
    return (
        <Page title="Create mocking rule">
            <Page.Title showBackButton>Create mocking rule</Page.Title>
            <MockingRuleForm />
            <Page.Footer />
        </Page>
    );
};

export default CreateRulePage;
export { CREATE_RULE_ROUTE };
