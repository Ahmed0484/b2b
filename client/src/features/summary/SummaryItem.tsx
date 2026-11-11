import { Box,  Paper, Typography } from "@mui/material"
import type { Item } from "../../app/models/basket"
import { currencyFormat } from "../../lib/util"


type Props = {
    item: Item
}

export default function SummaryItem({ item }: Props) {

    return (
        <Paper sx={{
            height: 140,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    component='img'
                    src={item.pictureUrl}
                    alt={item.name}
                    sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: '4px',
                        mr: 8,
                        ml: 4
                    }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Typography sx={{ fontSize: '1.1rem' }}>
                            {currencyFormat(item.price)} x {item.quantity}
                        </Typography>
                        <Typography sx={{ fontSize: '1.1rem' }} color='primary'>
                            {currencyFormat(item.price * item.quantity)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
           
        </Paper>
    )
}