import { Box, Card, CardActions, CardMedia, Chip, IconButton, Typography } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

function truncateContentLength(content) {
    if (content.length > 300) return content.substring(0, 300) + '...';
    return content;
}

const ReviewItem = (props) => {

    const authorDetails = props.authorDetails;

    return (
        <Card sx={{bgcolor: '#222222', padding: '1.5em', minWidth: props.reviewUrl ? '600px' : '500px', height: '200px', borderRadius: '10px', position: 'relative', zIndex: 0}} >
            { authorDetails &&
            <Box display='flex' flexDirection='row' justifyContent='space-between' maxWidth='100%' height='100%' alignItems='center' zIndex={1} overflow='auto'>
                <Box display='flex' height='100%' width='100%' zIndex={1} justifyContent='center' alignItems='center'>
                    {authorDetails.avatar_path && (<CardMedia component='img' src={'https://image.tmdb.org/t/p/w500' + authorDetails.avatar_path} sx={{borderRadius: '10px', maxWidth: '100px', marginRight: '1.5em', objectFit: 'contain'}} />)}
                    
                    <Box display='flex' flexDirection='column'>
                        { props.authorName && <Chip size="small" label={props.authorName} sx={{bgcolor: '#A0153E', color: '#FFFFFF', width: 'fit-content', marginBottom: '0.5em'}}/>}
                        { authorDetails && authorDetails.rating && <Chip size="small" label={'Rating: ' + authorDetails.rating} sx={{bgcolor: '#A0153E', color: '#FFFFFF', width: 'fit-content'}}/>}
                        {props.reviewContent && <Typography variant="body" color='#FFFFFF'>{truncateContentLength(props.reviewContent)}</Typography>}
                    </Box>
                </Box>
                {props.reviewUrl &&
                <CardActions sx={{ marginLeft: 0, padding: 0, height: '100%'}} zIndex={1}>
                    <IconButton  href={props.reviewUrl} target="_blank"><ArrowOutwardIcon sx={{color: '#FFFFFF'}} /></IconButton>
                </CardActions>}
            </Box>
            }
        </Card>
    )
}

export default ReviewItem;