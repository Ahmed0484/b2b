import { AppBar, Badge, Box, FormControlLabel, IconButton, LinearProgress, List, ListItem, Switch, Toolbar, Tooltip, Typography } from "@mui/material";
import { DarkMode, LightMode, ShoppingCart } from '@mui/icons-material';
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";
import { useFetchBasketQuery } from "../../features/basket/basketApi";

const midLinks = [
    { title: 'Catalog', path: '/catalog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
]

const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    typography: 'h6',
    textDecoration: 'none',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: '#baecf9'
    }
}


export default function NavBar() {
    const { isLoading, darkMode } = useAppSelector(state => state.ui);
    const dispatch = useAppDispatch();
    const {data:basket} = useFetchBasketQuery();
    const itemCount = basket?.items.reduce((sum,item)=> sum + item.quantity,0) || 0;
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#9b0594' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component={NavLink} to='/'
                        sx={[navStyles, (theme) => theme.typography.h4,
                            {
                                '&.active': { color: 'inherit' }, 
                                '&:hover': { color: 'inherit' },  
                                fontWeight: 'bolder'
                            }
                        ]} variant="h6">
                        B2B
                    </Typography>
                </Box>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path} sx={navStyles} >
                            {title}
                        </ListItem>
                    ))}
                </List>


                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton component={Link} to='/basket' size="large" sx={{ color: 'inherit' }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path} sx={navStyles}   >
                                {title}
                            </ListItem>
                        ))}
                        <ListItem>
                            <FormControlLabel
                                control={
                                    <><LightMode sx={{ fontSize: 15 }} />
                                        <Switch checked={darkMode} color="secondary" onChange={() => dispatch(setDarkMode())} />
                                        <DarkMode sx={{ fontSize: 15 }} /></>
                                }
                                label="" />
                        </ListItem>
                    </List>
                </Box>
            </Toolbar>
            {isLoading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress color="secondary" />
                </Box>
            )}
        </AppBar>
    )
}