import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import LaunchIcon from '@mui/icons-material/Launch';
import { Box, Chip, Grid, IconButton, Paper, Typography } from '@mui/material';
import { getPathConditionLabel, mockingRulePropType } from '../../models/mockingRule';
import { EDIT_RULE_ROUTE } from '../EditRulePage';

const MockingRule = ({ rule }) => {
    const history = useHistory();

    const cell = (title, value) => (
        <Grid container direction="column" spacing={0.5}>
            <Grid item>
                <Typography variant="overline" color="textSecondary">
                    {title}
                </Typography>
            </Grid>
            <Grid item zeroMinWidth>
                <Typography sx={{ overflowWrap: 'anywhere' }}>{value}</Typography>
            </Grid>
        </Grid>
    );

    const actions = (
        <Grid container justifyContent="flex-end">
            <Grid item>
                <IconButton size="small" onClick={() => history.push(EDIT_RULE_ROUTE.replace(':id', rule.id))}>
                    <LaunchIcon size="small" />
                </IconButton>
            </Grid>
        </Grid>
    );

    return (
        <Paper>
            <Box p={4}>
                <Grid container alignItems="flex-start" spacing={1}>
                    <Grid item xs={12} md={2}>
                        {cell('Method', rule.request.method)}
                    </Grid>

                    <Grid item xs={12} md={3}>
                        {cell('Path condition', getPathConditionLabel(rule.request.pathCondition))}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {cell('Path', rule.request.path)}
                    </Grid>

                    <Grid item xs={12} md={1}>
                        {actions}
                    </Grid>

                    <Grid container spacing={1} item xs={12} mt={1}>
                        {(rule.tags || []).map((tag) => (
                            <Grid key={tag} item>
                                <Chip label={tag} size="small" />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

MockingRule.propTypes = {
    rule: PropTypes.shape(mockingRulePropType).isRequired,
};

export default MockingRule;
