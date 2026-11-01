import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { DarkMode, LightMode } from '@mui/icons-material';

type Props = {
    toggleDarkMode: () => void;
    darkMode: boolean;
}

export default function NavBar({darkMode, toggleDarkMode}: Props) {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#9b0594' }}>
            <Toolbar>
                <Typography variant="h6">B2B</Typography>
                <IconButton onClick={toggleDarkMode}>
                    {darkMode ? <DarkMode /> : <LightMode sx={{color: 'white'}} /> }
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}