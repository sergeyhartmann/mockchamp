import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Stack } from '@mui/material';
import { mockingRulePropType } from '../../models/mockingRule';
import { HOME_PAGE_ROUTE } from '../../pages/HomePage';
import ErrorSplashScreen from '../ErrorSplashScreen';
import InputGroupContainer from './InputGroupContainer';
import RequestInputGroup from './RequestInputGroup';
import ResponseInputGroup from './ResponseInputGroup';
import Tags from './Tags';
import { CHANGE_TAGS_ACTION, useForm } from './useForm';
import { useMockingRuleRemove } from './useMockingRuleRemove';

const MockingRuleForm = ({ rule, tags }) => {
    const history = useHistory();
    const { state, dispatch, submit } = useForm(rule);
    const { remove, removing, hasErrorOnRemove } = useMockingRuleRemove(rule?.id);

    const onSubmit = () => submit(() => history.push(HOME_PAGE_ROUTE));
    const onDelete = () => remove(() => history.push(HOME_PAGE_ROUTE));

    const buttonDelete = (
        <Button startIcon={<DeleteIcon />} onClick={onDelete} disabled={state.submitting || removing} size="small">
            Delete
        </Button>
    );

    const buttonSubmit = (
        <Button
            variant="contained"
            onClick={onSubmit}
            disabled={state.submitting || removing}
            sx={{ minWidth: '180px' }}
        >
            Save
        </Button>
    );

    const actions = (
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
            {state.formData.id && buttonDelete}
            {buttonSubmit}
        </Stack>
    );

    if (hasErrorOnRemove) {
        return <ErrorSplashScreen />;
    }

    return (
        <Stack spacing={2}>
            <Tags
                options={tags}
                value={state.formData.tags}
                onChange={(value) => dispatch({ type: CHANGE_TAGS_ACTION, payload: value })}
            />

            <InputGroupContainer title="When following condition is matched (for request)">
                <RequestInputGroup
                    state={state.formData.request}
                    dispatch={dispatch}
                    errors={state.formError.request}
                />
            </InputGroupContainer>

            <InputGroupContainer title="Do the following (for response)">
                <ResponseInputGroup
                    state={state.formData.response}
                    dispatch={dispatch}
                    errors={state.formError.response}
                />
            </InputGroupContainer>

            {actions}
        </Stack>
    );
};

MockingRuleForm.propTypes = {
    rule: PropTypes.shape(mockingRulePropType),
    tags: PropTypes.arrayOf(PropTypes.string),
};

MockingRuleForm.defaultProps = {
    rule: undefined,
    tags: [],
};

export default MockingRuleForm;
