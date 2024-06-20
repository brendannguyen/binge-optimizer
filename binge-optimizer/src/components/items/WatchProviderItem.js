import { Box, Card, CardMedia, Typography } from "@mui/material";

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

const WatchProviderItem = (props) => {
    let numWordsName = 0;
    if (props.watchProviderName) {
        let words = props.watchProviderName.split(" ");
        words = words.filter(word => word !== "");
        numWordsName = words.length
    }
    let isNameMany = props.watchProviderName && numWordsName > 1;

    return (
        <Card sx={{bgcolor: '#2A2A2A', padding: '0.5em', width: props.imageSrc ? '160px' : '130px', minWidth: props.imageSrc ? '160px' : '130px', height: '100px', borderRadius: '10px', position: 'relative', zIndex: 0}} elevation={0}>
            <Box display='flex' flexDirection='row' justifyContent='space-between' maxWidth='100%' height='100%' alignItems='center' zIndex={1}>
                <Box display='flex' height='100%' width='100%' zIndex={1}>
                    {props.imageSrc && (<CardMedia component='img' src={'https://image.tmdb.org/t/p/original' + props.imageSrc} height='100%' sx={{borderRadius: '10px', maxWidth: 'fit-content'}} />)}
                    <Typography 
                        variant="h6" 
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
                        {truncateTitle(props.watchProviderName).toUpperCase()}
                    </Typography>
                </Box>
            </Box>
        </Card>
    )
}

export default WatchProviderItem;