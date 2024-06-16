import { Box, Card, CardActions, CardMedia, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";


import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

function truncateTitle(title, oneLine) {
    let words = title.split(" ");
    words = words.filter(word => word !== "");
    if (words.length === 0) return title;
    if (words.length === 1) {
        if (words[0].length > 6) return words[0].substring(0, 5) + '...';
        else return words[0];
    } 
    else if (oneLine) return words[0].substring(0, 5) + '...';
    else {
        let word1 = words[0];
        let word2 = words[words.length-1];
        if (word1.length > 6 || words.length  > 2) word1 = word1.substring(0, 5) + '...';
        if (word2.length > 6 || words.length  > 2) word2 = '...' + word2.substring(word2.length - 5, word2.length);

        return word1 + ' ' + word2;
    }
};

function truncateTitleLength(title) {
    if (title.length > 100) return title.substring(0, 100) + '...';
    return title;
}

const SearchItem = (props) => {

    let numWordsTitle = 0;
    if (props.title) {
        let words = props.title.split(" ");
        words = words.filter(word => word !== "");
        numWordsTitle = words.length
    }
    let isTitleMany = props.title && numWordsTitle > 1;

    const customXL = useMediaQuery('(min-width:1730px)');
    const customXS = useMediaQuery('(max-width:330px)');

    return (
        <Card raised sx={{bgcolor: '#2A2A2A', padding: '0.5em', minWidth: '170px', height: '155px', borderRadius: '10px', width: '100%'}}>
            <Box display='flex' flexDirection='row' justifyContent='space-between' maxWidth='100%' height='100%' alignItems='center'>
                <Box display='flex' height='100%' width='100%'>
                    {props.imageSrc && (<CardMedia component='img' src={'https://image.tmdb.org/t/p/w500' + props.imageSrc} height='100%' sx={{borderRadius: '10px', maxWidth: 'fit-content'}} />)}
                    {!customXL && <Typography 
                        variant="h4" 
                        color='#FFFFFF'
                        gutterBottom 
                        sx={{
                            fontWeight: 500, 
                            writingMode: 'vertical-rl', 
                            textOrientation: 'sideways', 
                            transform: 'rotate(180deg)', 
                            wordBreak: 'break-word',
                            textAlign: 'left',
                            ...(isTitleMany && !customXS) && {textAlignLast: 'right'},
                            direction: (isTitleMany && !customXS) ? 'rtl' : 'ltr',
                            overflow: 'hidden',
                            height: '100%'
                        }}
                        >
                        {truncateTitle(props.title, customXS).toUpperCase()}
                    </Typography> }
                    {customXL && <Box paddingLeft='0.5em' paddingRight='0.5em' width='100%' alignItems='center' justifyContent='center' display='flex'><Typography 
                        variant="h6" 
                        color='#FFFFFF' 
                        sx={{
                            fontWeight: 500,
                            textAlign: 'center',
                            overflow: 'auto',
                            maxWidth: '350px',
                            maxHeight: '100%',
                            wordWrap: 'break-word',
                        }}
                        >
                        {truncateTitleLength(props.title)}
                        </Typography></Box> }
                </Box>
                <CardActions sx={{ marginLeft: 0, padding: 0, height: '100%'}}>
                    <Stack direction='column' justifyContent='space-between' height='100%'>
                        <Box display='flex' justifyContent='center' flexDirection='column'>
                            <Typography variant="body" color='#FFFFFF' textAlign='center'>{props.rating}</Typography>
                            <IconButton  href={`https://www.themoviedb.org/${props.type}/${props.id}`} target="_blank"><ArrowOutwardIcon sx={{color: '#3F3F3F'}} /></IconButton>
                        </Box>
                        <IconButton ><AddCircleOutlineIcon sx={{color: '#FFFFFF'}} /></IconButton>
                    </Stack>
                </CardActions>
            </Box>
        </Card>
    )
}

export default SearchItem;
