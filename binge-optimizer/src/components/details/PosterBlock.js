import { Box, Card, CardMedia } from "@mui/material";


const PosterBlock = (props) => {
    return(
        <Card raised sx={{bgcolor: '#2A2A2A', padding: '0.5em', height: '310px', borderRadius: '10px', position: 'relative', zIndex: 0, minWidth: 'max-content', marginRight: '1.5em' }} >
            <Box display='flex' height='100%' width='max-content' zIndex={1}>
                {props.imageSrc && (<CardMedia component='img' src={'https://image.tmdb.org/t/p/original' + props.imageSrc} height='100%' sx={{borderRadius: '10px', maxWidth: 'fit-content'}} />)}
            </Box>
        </Card>
    )

}

export default PosterBlock;