import { Box, Card, IconButton, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import ListItem from "./items/ListItem";

import ClearAllIcon from '@mui/icons-material/ClearAll';

const ListBlock = ({ setListItems, setCurrentShownItem, ...props }) => {

    const handleItemRemove = (id) => {
        setListItems(prevItems => {
            return prevItems.filter(prevItem => prevItem.id !== id)
        });
    };

    const handleClearItems = () => {
        setListItems(prevItems => {
            if (!prevItems || prevItems.length > 0) return [];
            return prevItems;
        })
    }

    const handleItemShow = (id) => {
        setCurrentShownItem(prevItem => {
            const newItem = props.items.find(item => item.id === id)
            if (!prevItem || prevItem.id !== newItem.id) return newItem;
        })
    }

    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', height: '25%', minHeight: '200px', borderRadius: '10px', width: '100%'}}>
            <Box overflow='auto' height='100%' marginRight='1.5em' display='flex' alignItems='center'>
                <Box sx={{ display: 'flex', transform: 'rotate(-90deg)', marginLeft: '-0.5em', marginRight: '-0.5em'}} alignItems='center'>
                    {(props.items && props.items.length > 0) && <Tooltip title='Clear All'><IconButton onClick={handleClearItems} sx={{ transform: 'rotate(90deg)', padding: 0, marginRight: '0.5em'}}><ClearAllIcon sx={{color: "#FFFFFF"}}/></IconButton></Tooltip>}
                    <Typography variant="h6" color='#FFFFFF' width='max-content'>YOUR LIST</Typography>
                </Box>
                <Box overflow='auto' height='100%'  display='flex' alignItems='center'>
                    <Stack direction='row' spacing='1.5em'>
                        {(!props.items || props.items.length === 0) &&
                            <>
                            <Skeleton variant="rounded" width='100%' height='155px' animation='wave' sx={{minWidth: '180px', borderRadius: '10px', bgcolor: '#2A2A2A'}} />
                            <Skeleton variant="rounded" width='100%' height='155px' animation='wave' sx={{minWidth: '180px', borderRadius: '10px', bgcolor: '#232323'}} />
                            <Skeleton variant="rounded" width='100%' height='155px' animation='wave' sx={{minWidth: '180px', borderRadius: '10px', bgcolor: '#1E1E1E'}} />
                            </>
                        }
                        {props.items && props.items.map((item, index) => (
                            <ListItem key={index} currentShownItemId={props.currentShownItem ? props.currentShownItem.id : null} removeItem={handleItemRemove} showItem={handleItemShow} title={item.name || item.title} rating={item.vote_average} imageSrc={item.poster_path} id={item.id} type={item.media_type} release_date={item.release_date} original_air_date={item.first_air_date} backdropSrc={item.backdrop_path}/>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Card>
    )
}

export default ListBlock;