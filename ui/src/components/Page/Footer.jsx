import React from 'react';
import { Grid, Link, Typography } from '@mui/material';
import { GITHUB_LINK, VERSION } from '../../consts';

const Footer = () => {
    return (
        <Grid container justifyContent="center" spacing={2} mt={6}>
            <Grid item>
                <Typography variant="body2" color="textSecondary">
                    MockChamp build ver. {VERSION}
                </Typography>
            </Grid>

            <Grid item>
                <Typography variant="body2" color="textSecondary">
                    |
                </Typography>
            </Grid>

            <Grid item>
                <Link href={GITHUB_LINK} target="_blank" variant="body2" color="textSecondary">
                    GitHub
                </Link>
            </Grid>
        </Grid>
    );
};

export default Footer;
