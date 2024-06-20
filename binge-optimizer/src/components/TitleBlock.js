import { Card, Typography, useMediaQuery } from "@mui/material";

const TitleBlock = () => {
    const smallSize = useMediaQuery('(min-width:600px)');

    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', padding: smallSize ? '1.5em': '0.5em', height: 'fit-content', borderRadius: '10px', minWidth: 'max-content'}}>
            <Typography variant="h5" textAlign='center' color='#A0153E'>BINGE OPTIMIZER</Typography>
        </Card>
    )
}

export default TitleBlock;