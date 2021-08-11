import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Grid, Link, Paper } from '@mui/material';
import { mockingRulePropType } from '../../models/mockingRule';
import MockingRule from './MockingRule';
import { downloadObjectAsJson } from './download';

const MockingRuleList = ({ rules }) => {
    if (rules.length === 0) {
        return null;
    }

    const buttonExportJson = (
        <Link component="button" onClick={() => downloadObjectAsJson(rules, 'rules')}>
            Export JSON
        </Link>
    );

    return (
        <Paper>
            <Box p={4}>
                <Grid container direction="column" spacing={2}>
                    <Grid item alignSelf="flex-end" mb={2}>
                        {buttonExportJson}
                    </Grid>

                    {rules.map((rule) => (
                        <Grid key={rule.id} item>
                            <MockingRule rule={rule} />
                            <Box mt={1}>
                                <Divider />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
};

MockingRuleList.propTypes = {
    rules: PropTypes.arrayOf(PropTypes.shape(mockingRulePropType)).isRequired,
};

export default MockingRuleList;
