import { Box, Card, CardActions, CardMedia, IconButton, Popover, Stack, Typography, useMediaQuery } from "@mui/material";

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useEffect, useRef, useState } from "react";
import ActorExtendedItem from "./ActorExtendedItem";

function truncateTitle(title) {
    let words = title.split(" ");
    words = words.filter(word => word !== "");
    if (words.length === 0) return title;
    if (words.length === 1) {
        if (words[0].length > 6) return words[0].substring(0, 5) + '...';
        else return words[0];
    } 
    else {
        let word1 = words[0];
        let word2 = words[words.length-1];
        if (word1.length > 6 || words.length  > 2) word1 = word1.substring(0, 5) + '...';
        if (word2.length > 6 || words.length  > 2) word2 = '...' + word2.substring(word2.length - 5, word2.length);

        return word1 + ' ' + word2;
    }
};

const ActorItem = (props) => {
    let numWordsName = 0;
    if (props.actorName) {
        let words = props.actorName.split(" ");
        words = words.filter(word => word !== "");
        numWordsName = words.length
    }
    let isNameMany = props.actorName && numWordsName > 1;

    const largeSize = useMediaQuery('(min-width:1200px)');
    const [isEnoughHover, setIsEnoughHover] = useState(false);
    var timeoutId = null;
    const handleHoverOver = () => {
        timeoutId = setTimeout(function(){
            setIsEnoughHover(true);
            setOpenPopover(true);
        }, 800)
    }

    const handleHoverCancel = () => {
        clearTimeout(timeoutId);
        setIsEnoughHover(false);
        setOpenPopover(false);
    }
    const cardRef = useRef(null);
    const [openPopover, setOpenPopover] = useState(false);

        // double check mouse position
    useEffect(() => {
        window.addEventListener('mousemove', checkHover, true);
        return () => {
            window.removeEventListener('mousemove', checkHover, true);
        }
    })

    // double check no longer hovering
    const checkHover = (e) => {
        if (cardRef.current) {
            const mouseOver = cardRef.current.contains(e.target);
            if (!mouseOver && isEnoughHover) handleHoverCancel();
        }
    }

    return (
        <>
        {largeSize && 
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: 'none',
                justifyContent: 'center',
                '.MuiPaper-root': {
                    borderRadius: '10px',
                    bgcolor: '#0E0E0E'
                },
            }}
            open={openPopover}
            anchorEl={cardRef.current}
            anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
            }}
            transformOrigin={{
            vertical: 'center',
            horizontal: 'top',
            }}
            disableRestoreFocus
        >
           <ActorExtendedItem id={props.actorId} />
        </Popover>
        }
        <Card ref={cardRef} sx={{bgcolor: '#2A2A2A', padding: '0.5em', width: props.imageSrc ? '230px' : '130px', minWidth: props.imageSrc ? '230px' : '130px', height: '155px', borderRadius: '10px', position: 'relative', zIndex: 0}} elevation={0} onMouseEnter={handleHoverOver} onMouseLeave={handleHoverCancel}>
            <Box display='flex' flexDirection='row' justifyContent='space-between' maxWidth='100%' height='100%' alignItems='center' zIndex={1}>
                <Box display='flex' height='100%' width='100%' zIndex={1}>
                    {props.imageSrc && (<CardMedia component='img' src={'https://image.tmdb.org/t/p/w500' + props.imageSrc} height='100%' sx={{borderRadius: '10px', maxWidth: 'fit-content'}} />)}
                    <Typography 
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
                            ...(isNameMany) && {textAlignLast: 'right'},
                            direction: 'rtl',
                            overflow: 'hidden',
                            height: '100%'
                        }}
                        >
                        {truncateTitle(props.actorName).toUpperCase()}
                    </Typography>
                </Box>
                <CardActions sx={{ marginLeft: 0, padding: 0, height: '100%'}} zIndex={1}>
                    <Stack direction='column' justifyContent='space-between' height='100%'>
                        <Box display='flex' justifyContent='center' flexDirection='column'>
                            <Typography variant="body" color='#FFFFFF' textAlign='center'>{props.actorPop.toFixed(2)}</Typography>
                        </Box>
                        <Box display='flex' justifyContent='center' flexDirection='column'>
                            <IconButton  href={`https://www.themoviedb.org/person/${props.actorId}`} target="_blank"><ArrowOutwardIcon sx={{color: '#FFFFFF'}} /></IconButton>
                        </Box>
                    </Stack>
                </CardActions>
            </Box>
        </Card>
        </>
    )
}

export default ActorItem;