import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Code from './Code';
import { TYPE_JSON, TYPE_TEXT, TYPE_XML, useFormatter } from './useFormatter';

const helperTextBase = (
    <Typography variant="body2" color="textSecondary">
        Press <Code>Ctrl+S</Code> (or <Code>Cmd+S</Code> for Macintosh) for formatting.
    </Typography>
);

const helperTextInvalidJson = (
    <Typography variant="body2" color="error">
        Text is in invalid json format.
    </Typography>
);

const helperTextInvalidXml = (
    <Typography variant="body2" color="error">
        Text is in invalid xml format.
    </Typography>
);

const ResponseBody = ({ body, onChange }) => {
    const { type, changeType, hasError, resetError, format } = useFormatter();

    const handleTypeChange = (event, value) => {
        if (value !== null) {
            changeType(value);
        }
    };

    const handleBodyChange = (event) => {
        resetError();
        onChange(event.target.value);
    };

    useEffect(() => {
        onChange(format(body));
    }, [type]);

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <TextField
                    label="Response body"
                    fullWidth
                    multiline
                    minRows={5}
                    maxRows={20}
                    value={body}
                    onChange={handleBodyChange}
                    onKeyDown={(event) => {
                        const metaKey = event.metaKey || event.ctrlKey;
                        if (metaKey && event.key === 's') {
                            event.preventDefault();
                            onChange(format(body));
                        }
                    }}
                    onBlur={() => onChange(format(body))}
                />
            </Grid>

            <Grid item container alignItems="center" spacing={1}>
                <Grid item>
                    <ToggleButtonGroup value={type} exclusive onChange={handleTypeChange} size="small">
                        <ToggleButton value={TYPE_TEXT}>{TYPE_TEXT}</ToggleButton>
                        <ToggleButton value={TYPE_XML}>{TYPE_XML}</ToggleButton>
                        <ToggleButton value={TYPE_JSON}>{TYPE_JSON}</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>

                <Grid item>
                    {type === TYPE_XML && hasError && helperTextInvalidXml}
                    {type === TYPE_XML && !hasError && helperTextBase}

                    {type === TYPE_JSON && hasError && helperTextInvalidJson}
                    {type === TYPE_JSON && !hasError && helperTextBase}
                </Grid>
            </Grid>
        </Grid>
    );
};

ResponseBody.propTypes = {
    body: PropTypes.string,
    onChange: PropTypes.func,
};

ResponseBody.defaultProps = {
    body: '',
    onChange: () => {},
};

export default ResponseBody;
