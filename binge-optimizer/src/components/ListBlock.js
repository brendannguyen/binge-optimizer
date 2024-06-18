import { Box, Card, Stack, Typography } from "@mui/material";
import ListItem from "./items/ListItem";

const ListBlock = ({ setListItems, ...props }) => {

    const handleItemRemove = (id) => {
        setListItems(prevItems => {
            return prevItems.filter(prevItem => prevItem.id !== id)
        });
    };

    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', height: '25%', minHeight: '200px', borderRadius: '10px', width: '100%'}}>
            <Box overflow='auto' height='100%' marginRight='1.5em' display='flex' alignItems='center' >
                <Box sx={{ display: 'flex', transform: 'rotate(-90deg)'}}>
                    <Typography variant="h6" color='#FFFFFF' width='max-content' marginLeft='-0.5em' marginRight='-0.5em'>YOUR LIST</Typography>
                </Box>
                <Box overflow='auto' height='100%'  display='flex' alignItems='center'>
                    <Stack direction='row' spacing='1.5em'>
                        {props.items && props.items.map((item, index) => (
                            <ListItem removeItem={handleItemRemove} title={item.name || item.title} rating={item.vote_average} imageSrc={item.poster_path} id={item.id} type={item.media_type} release_date={item.release_date} original_air_date={item.first_air_date} backdropSrc={item.backdrop_path}/>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Card>
    )
}

export default ListBlock;