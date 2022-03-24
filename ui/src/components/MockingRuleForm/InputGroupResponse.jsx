import React from 'react';
import PropTypes from 'prop-types';
import { Grid, InputAdornment, TextField } from '@mui/material';
import { responsePropType } from '../../models/mockingRule';
import ResponseBody from './ResponseBody';
import ResponseHeaders from './ResponseHeaders';
import {
    CHANGE_RESPONSE_BODY_ACTION,
    CHANGE_RESPONSE_DELAYED_BY_ACTION,
    CHANGE_RESPONSE_HEADERS_ACTION,
    CHANGE_RESPONSE_HTTP_STATUS_ACTION,
} from './useForm';

const InputGroupResponse = ({ state, dispatch, errors }) => {
    const handleHttpStatusChange = (event) => {
        if (/^[0-9]*$/.test(event.target.value)) {
            dispatch({ type: CHANGE_RESPONSE_HTTP_STATUS_ACTION, payload: parseInt(event.target.value, 10) || 0 });
        }
    };

    const handleDelayedByChange = (event) => {
        if (/^[0-9]*$/.test(event.target.value)) {
            dispatch({ type: CHANGE_RESPONSE_DELAYED_BY_ACTION, payload: parseInt(event.target.value, 10) || 0 });
        }
    };

    const handleHeadersChange = (headers) => {
        dispatch({ type: CHANGE_RESPONSE_HEADERS_ACTION, payload: headers });
    };

    const handleBodyChange = (body) => {
        dispatch({ type: CHANGE_RESPONSE_BODY_ACTION, payload: body });
    };

    return (
        <Grid container direction="column" spacing={4}>
            <Grid item container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Return HTTP status as"
                        fullWidth
                        value={state.httpStatus}
                        onChange={handleHttpStatusChange}
                        error={Boolean(errors.httpStatus)}
                        helperText={errors.httpStatus}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Response delayed by"
                        fullWidth
                        InputProps={{ endAdornment: <InputAdornment position="end">ms</InputAdornment> }}
                        value={state.delayedBy || 0}
                        onChange={handleDelayedByChange}
                        error={Boolean(errors.delayedBy)}
                        helperText={errors.delayedBy}
                    />
                </Grid>
            </Grid>

            <Grid item>
                <ResponseHeaders headers={state.headers} onChange={handleHeadersChange} />
            </Grid>

            <Grid item>
                <ResponseBody body={state.body} onChange={handleBodyChange} />
            </Grid>
        </Grid>
    );
};

InputGroupResponse.propTypes = {
    state: PropTypes.shape(responsePropType).isRequired,
    dispatch: PropTypes.func.isRequired,
    errors: PropTypes.shape({
        httpStatus: PropTypes.string,
        delayedBy: PropTypes.string,
    }),
};

InputGroupResponse.defaultProps = {
    errors: {},
};

export default InputGroupResponse;
