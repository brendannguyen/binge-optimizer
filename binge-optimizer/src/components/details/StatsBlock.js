import { Box, Card, Chip, Typography } from "@mui/material";


const StatsBlock = (props) => {

    const itemDetails = props.itemDetails;

    const currencyOptions = {
        style: 'currency',
        currency: 'USD',
    }

    return (
        <Card raised sx={{bgcolor: '#2A2A2A', borderRadius: '10px', position: 'relative', zIndex: 0, flexGrow: 1, height: 'fit-content', overflow: 'auto'}}>
            {itemDetails &&
            <Box display='flex' flexDirection='column' alignItems='center' height='100%' padding='1.5em' minWidth='200px'>
                {props.type === "movie" && (
                    <>
                    <Box marginBottom='0.5em' display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='Release Date' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.release_date ? itemDetails.release_date : 'N/A'}</Typography></Box>
                    <Box marginBottom='0.5em' display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='Popularity' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.popularity ? itemDetails.popularity.toFixed(0) : 'N/A'}</Typography></Box>
                    <Box marginBottom='0.5em' display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='Runtime' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.runtime ? itemDetails.runtime + ' mins' : 'N/A'}</Typography></Box>
                    <Box marginBottom='0.5em' display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='Budget' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.budget ? itemDetails.budget.toLocaleString('en-US', currencyOptions) : 'N/A'}</Typography></Box>
                    <Box marginBottom='0.5em' display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='Revenue' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.revenue ? itemDetails.revenue.toLocaleString('en-US', currencyOptions) : 'N/A'}</Typography></Box>
                    <Box display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='Status' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.status ? itemDetails.status : 'N/A'}</Typography></Box>
                    </>
                    )
                }
                {props.type === "tv" && ( 
                    <>
                    <Box marginBottom='0.5em' display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='First Air Date' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.first_air_date ? itemDetails.first_air_date : 'N/A'}</Typography></Box>
                    <Box marginBottom='0.5em' display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='Last Air Date' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.last_air_date ? itemDetails.last_air_date : 'N/A'}</Typography></Box>
                    <Box marginBottom='0.5em' display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='Popularity' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.popularity ? itemDetails.popularity.toFixed(0) : 'N/A'}</Typography></Box>
                    <Box marginBottom='0.5em' display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='No. of Seasons' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.number_of_seasons ? itemDetails.number_of_seasons : 'N/A'}</Typography></Box>
                    <Box marginBottom='0.5em' display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='No. of Episodes' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.number_of_episodes ? itemDetails.number_of_episodes : 'N/A'}</Typography></Box>
                    <Box marginBottom='0.5em' display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='Episode Runtime' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.episode_run_time ? itemDetails.episode_run_time + ' mins' : 'N/A'}</Typography></Box>
                    <Box display='flex' flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'><Chip size="small" label='Status' sx={{bgcolor: '#A0153E', color: '#FFFFFF'}}/><Typography variant="body" color='#FFFFFF' gutterBottom sx={{fontWeight: 500}}>{itemDetails.status ? itemDetails.status : 'N/A'}</Typography></Box>
                    </>
                    )
                }
            </Box> }
        </Card>
    )
}

export default StatsBlock;