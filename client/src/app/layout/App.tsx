import {useState } from "react"
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: (paletteType === 'light') ? '#ffffff' : '#121212'
      }
    }
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }


  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
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
