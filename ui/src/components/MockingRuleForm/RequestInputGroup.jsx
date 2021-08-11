import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import {
    METHOD_GET,
    METHOD_HEAD,
    METHOD_POST,
    METHOD_PUT,
    METHOD_PATCH,
    METHOD_DELETE,
    METHOD_CONNECT,
    METHOD_OPTIONS,
    METHOD_TRACE,
    PATH_CONDITION_CONTAINS,
    PATH_CONDITION_CONTAINS_LABEL,
    PATH_CONDITION_EXACT,
    PATH_CONDITION_EXACT_LABEL,
    PATH_CONDITION_START_WITH,
    PATH_CONDITION_START_WITH_LABEL,
    requestPropType,
} from '../../models/mockingRule';
import {
    CHANGE_REQUEST_METHOD_ACTION,
    CHANGE_REQUEST_PATH_ACTION,
    CHANGE_REQUEST_PATH_CONDITION_ACTION,
} from './useForm';

const methodSelectOptions = [
    {
        value: METHOD_GET,
        label: METHOD_GET,
    },
    {
        value: METHOD_HEAD,
        label: METHOD_HEAD,
    },
    {
        value: METHOD_POST,
        label: METHOD_POST,
    },
    {
        value: METHOD_PUT,
        label: METHOD_PUT,
    },
    {
        value: METHOD_PATCH,
        label: METHOD_PATCH,
    },
    {
        value: METHOD_DELETE,
        label: METHOD_DELETE,
    },
    {
        value: METHOD_CONNECT,
        label: METHOD_CONNECT,
    },
    {
        value: METHOD_OPTIONS,
        label: METHOD_OPTIONS,
    },
    {
        value: METHOD_TRACE,
        label: METHOD_TRACE,
    },
];

const pathConditionSelectOptions = [
    {
        value: PATH_CONDITION_EXACT,
        label: PATH_CONDITION_EXACT_LABEL,
    },
    {
        value: PATH_CONDITION_START_WITH,
        label: PATH_CONDITION_START_WITH_LABEL,
    },
    {
        value: PATH_CONDITION_CONTAINS,
        label: PATH_CONDITION_CONTAINS_LABEL,
    },
];

const RequestInputGroup = ({ state, dispatch, errors }) => {
    const handleMethodChange = (event) => {
        dispatch({ type: CHANGE_REQUEST_METHOD_ACTION, payload: event.target.value });
    };

    const handlePathConditionChange = (event) => {
        dispatch({ type: CHANGE_REQUEST_PATH_CONDITION_ACTION, payload: event.target.value });
    };

    const handlePathChange = (event) => {
        if (state.pathCondition === PATH_CONDITION_CONTAINS) {
            dispatch({ type: CHANGE_REQUEST_PATH_ACTION, payload: event.target.value });
            return;
        }

        dispatch({
            type: CHANGE_REQUEST_PATH_ACTION,
            payload: event.target.value.startsWith('/') ? event.target.value : '/' + event.target.value,
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <FormControl fullWidth error={Boolean(errors.method)}>
                    <InputLabel id="method-label">Method</InputLabel>
                    <Select value={state.method} labelId="method-label" label="Method" onChange={handleMethodChange}>
                        {methodSelectOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.method && <FormHelperText>{errors.method}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
                <FormControl fullWidth error={Boolean(errors.pathCondition)}>
                    <InputLabel id="path-condition-label">Path condition</InputLabel>
                    <Select
                        value={state.pathCondition}
                        labelId="path-condition-label"
                        label="Path condition"
                        onChange={handlePathConditionChange}
                    >
                        {pathConditionSelectOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.pathCondition && <FormHelperText>{errors.pathCondition}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    label="Path"
                    fullWidth
                    value={state.path}
                    onChange={handlePathChange}
                    error={Boolean(errors.path)}
                    helperText={errors.path}
                />
            </Grid>
        </Grid>
    );
};

RequestInputGroup.propTypes = {
    state: PropTypes.shape(requestPropType).isRequired,
    dispatch: PropTypes.func.isRequired,
    errors: PropTypes.shape({
        method: PropTypes.string,
        pathCondition: PropTypes.string,
        path: PropTypes.string,
    }),
};

RequestInputGroup.defaultProps = {
    errors: {},
};

export default RequestInputGroup;
