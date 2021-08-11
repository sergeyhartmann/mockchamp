import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotFoundPage from '../pages/NotFoundPage';

const RouteSwitcher = ({ routes }) => {
    return (
        <Switch>
            {routes.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                    <Component />
                </Route>
            ))}

            <Route>
                <NotFoundPage />
            </Route>
        </Switch>
    );
};

RouteSwitcher.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            Component: PropTypes.elementType.isRequired,
        }),
    ).isRequired,
};

export default RouteSwitcher;
