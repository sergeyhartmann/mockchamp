import { createTheme } from '@mui/material/styles';

const useTheme = () => {
    const theme = createTheme({
        shape: {
            borderRadius: 8,
        },
        palette: {
            mode: 'light',
            background: {
                default: '#f8f8f8',
            },
            primary: {
                main: '#222',
            },
        },
    });

    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;

    return { theme };
};

export { useTheme };
