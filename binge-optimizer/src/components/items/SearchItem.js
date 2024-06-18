import { Box, Card, CardActions, CardMedia, IconButton, Popover, Stack, Typography, useMediaQuery } from "@mui/material";


import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useRef, useState } from "react";
import ExtendedItem from "./ExtendedItem";

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
    const mediumSize = useMediaQuery('(min-width:900px)');

    let date = null;
    if (props.release_date) date = props.release_date.split("-")[0];
    if (props.original_air_date) date = props.original_air_date.split("-")[0];


    const [isEnoughHover, setIsEnoughHover] = useState(false);
    var timeoutId = null;
    const handleHoverOver = () => {
        timeoutId = setTimeout(function(){
            setIsEnoughHover(true);
            setOpenPopover(true);
        }, 1000)
    }

    const handleHoverCancel = () => {
        clearTimeout(timeoutId);
        setIsEnoughHover(false);
        setOpenPopover(false);
    }
    const cardRef = useRef(null);
    const [openPopover, setOpenPopover] = useState(false);

    return (
        <>
        {mediumSize && 
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: 'none',
                backgroundColor: 'transparent',
                justifyContent: 'center',
                '.MuiPaper-root': {
                    bgcolor: 'transparent',
                    justifyContent: 'center',
                    padding: '0.5em',
                    height: '155px',
                    overflow: 'hidden',
                },
            }}
            open={openPopover}
            anchorEl={cardRef.current}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            disableRestoreFocus
            elevation={0}
        >
           <ExtendedItem type={props.type} id={props.id} />
        </Popover>
        }
        <Card ref={cardRef} raised sx={{bgcolor: '#2A2A2A', padding: '0.5em', minWidth: '170px', height: '155px', borderRadius: '10px', width: '100%', position: 'relative', zIndex: 0 }}  onMouseEnter={handleHoverOver} onMouseLeave={handleHoverCancel} >
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(https://image.tmdb.org/t/p/original${props.backdropSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'opacity 1s ease', opacity: isEnoughHover ? 0.2 : 0, zIndex: 0}} />

            <Box display='flex' flexDirection='row' justifyContent='space-between' maxWidth='100%' height='100%' alignItems='center' zIndex={1}>
                <Box display='flex' height='100%' width='100%' zIndex={1}>
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
                <CardActions sx={{ marginLeft: 0, padding: 0, height: '100%'}} zIndex={1}>
                    <Stack direction='column' justifyContent='space-between' height='100%'>
                        <Box display='flex' justifyContent='center' flexDirection='column'>
                            
                            <Typography variant="body" color='#FFFFFF' textAlign='center'>{props.rating}</Typography>
                            { date && (<Typography variant="body2" color='#5C5B5B' textAlign='center'>{date}</Typography>)}
                        </Box>
                        <Box display='flex' justifyContent='center' flexDirection='column'>
                            <IconButton  href={`https://www.themoviedb.org/${props.type}/${props.id}`} target="_blank"><ArrowOutwardIcon sx={{color: '#FFFFFF'}} /></IconButton>
                            <IconButton ><AddCircleOutlineIcon sx={{color: '#FFFFFF'}} /></IconButton>
                        </Box>
                    </Stack>
                </CardActions>
            </Box>
        </Card>
        </>
    )
}

export default SearchItem;
