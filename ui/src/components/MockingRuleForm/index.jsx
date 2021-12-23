import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid } from '@mui/material';
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
            fullWidth
            sx={{ minWidth: '180px' }}
        >
            Save
        </Button>
    );

    const actions = state.formData.id ? (
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
            <Grid item>{buttonDelete}</Grid>
            <Grid item>{buttonSubmit}</Grid>
        </Grid>
    ) : (
        buttonSubmit
    );

    if (hasErrorOnRemove) {
        return <ErrorSplashScreen />;
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Tags
                    options={tags}
                    value={state.formData.tags}
                    onChange={(value) => dispatch({ type: CHANGE_TAGS_ACTION, payload: value })}
                />
            </Grid>

            <Grid item>
                <InputGroupContainer title="When following condition is matched (for request)">
                    <RequestInputGroup
                        state={state.formData.request}
                        dispatch={dispatch}
                        errors={state.formError.request}
                    />
                </InputGroupContainer>
            </Grid>

            <Grid item>
                <InputGroupContainer title="Do the following (for response)">
                    <ResponseInputGroup
                        state={state.formData.response}
                        dispatch={dispatch}
                        errors={state.formError.response}
                    />
                </InputGroupContainer>
            </Grid>

            <Grid item alignSelf="flex-end">
                {actions}
            </Grid>
        </Grid>
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
