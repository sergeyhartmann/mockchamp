import React from 'react';
import { Link, Stack, Typography } from '@mui/material';

const Footer = () => {
    const title = (
        <Stack direction="row" alignItems="center" spacing={1}>
            <img src="/favicon.ico" alt="" width={18} height={18} />
            <Typography variant="body2" color="textSecondary">
                MockChamp build ver. {process.env.REACT_APP_VERSION || 'DEV'}
            </Typography>
        </Stack>
    );

    return (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mt={6}>
            {title}

            <Typography variant="body2" color="textSecondary">
                |
            </Typography>

            <Link
                href="https://github.com/sergeyhartmann/mockchamp"
                target="_blank"
                variant="body2"
                color="textSecondary"
            >
                GitHub
            </Link>
        </Stack>
    );
};

export default Footer;
