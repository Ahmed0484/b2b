import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useAppSelector } from "../store/store";

function App() {
 const {darkMode} = useAppSelector(state=>state.ui);

  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: (paletteType === 'light') ? '#ffffff' : '#121212'
      }
    }
  });

return (
    <ThemeProvider theme={theme}>
      <ScrollRestoration />
      <CssBaseline/>
      <NavBar  />
      <Box  sx={{
          minHeight: '100vh',
          background: darkMode 
            ? 'radial-gradient(circle, #640464, #111B27)'
            : 'radial-gradient(circle, #ed84d3, #fff0fd)',
          py: 3
        }}>
        <Container maxWidth='xl' sx={{ mt: 8 }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
    
  )
}

export default App
