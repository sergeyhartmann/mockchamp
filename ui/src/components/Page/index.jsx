import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Fade } from '@mui/material';
import Footer from './Footer';
import Title from './Title';

const Page = ({ title, children }) => {
    document.title = `${title} | MockChamp UI`;

    return (
        <Fade in>
            <Container maxWidth="md">
                <Box py={4}>{children}</Box>
            </Container>
        </Fade>
    );
};

Page.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

Page.Title = Title;
Page.Footer = Footer;

export default Page;
