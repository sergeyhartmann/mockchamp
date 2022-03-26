import React from 'react';
import { Grid, Link, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Grid container justifyContent="center" spacing={2} mt={6}>
            <Grid item>
                <Typography variant="body2" color="textSecondary">
                    MockChamp build ver. {process.env.REACT_APP_VERSION || 'DEV'}
                </Typography>
            </Grid>

            <Grid item>
                <Typography variant="body2" color="textSecondary">
                    |
                </Typography>
            </Grid>

            <Grid item>
                <Link
                    href="https://github.com/sergeyhartmann/mockchamp"
                    target="_blank"
                    variant="body2"
                    color="textSecondary"
                >
                    GitHub
                </Link>
            </Grid>
        </Grid>
    );
};

export default Footer;
