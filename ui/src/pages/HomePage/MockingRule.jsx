import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import LaunchIcon from '@mui/icons-material/Launch';
import { Grid, IconButton, Typography } from '@mui/material';
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
            <Grid item minWidth={0}>
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
        <Grid container alignItems="flex-start" spacing={1} minHeight="100px">
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
        </Grid>
    );
};

MockingRule.propTypes = {
    rule: PropTypes.shape(mockingRulePropType).isRequired,
};

export default MockingRule;
