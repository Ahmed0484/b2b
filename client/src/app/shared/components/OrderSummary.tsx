import { Box, Typography, Button,  Paper } from "@mui/material";
import { currencyFormat } from "../../../lib/util";
import { useFetchBasketQuery } from "../../../features/basket/basketApi";
import { Item } from "../../models/basket";
import { Link } from "react-router-dom";

export default function OrderSummary() {
    const {data: basket} = useFetchBasketQuery();
    const total = 
    basket?.items.reduce((sum: number, item: Item) => sum + item.quantity * item.price, 0) ?? 0;
    

    return (
        <Box sx={{display:"flex" ,flexDirection:"column" ,alignItems:"center" ,maxWidth:"lg", mx:"auto"}}>
            <Paper sx={{ mb: 2, p: 3, width: '100%', borderRadius: 3 }}>
                <Box sx={{mt:2}}>
                    <Box sx={{display:"flex" ,justifyContent:"space-between" ,mb:1}}>
                        <Typography color="textSecondary">Total</Typography>
                        <Typography>
                            {currencyFormat(total)}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{mt:2}}>
                    <Button
                        component={Link}
                        to='/summary'
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        Summary
                    </Button>
                    <Button
                        component={Link}
                        to='/catalog'
                        fullWidth
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}