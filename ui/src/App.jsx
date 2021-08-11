import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import RouteSwitcher from './components/RouteSwitcher';
import { useTheme } from './hooks/useTheme';
import { routes } from './routes';

const App = () => {
    const { theme } = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <HashRouter>
                <RouteSwitcher routes={routes} />
            </HashRouter>
        </ThemeProvider>
    );
};

export default App;
