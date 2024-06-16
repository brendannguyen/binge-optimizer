import { Box, Card, Stack, Typography } from "@mui/material";
import ListItem from "./items/ListItem";

const ListBlock = () => {
    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', height: '25%', minHeight: '200px', borderRadius: '10px', width: '100%'}}>
            <Box overflow='auto' height='100%' marginRight='1.5em' display='flex' alignItems='center' >
                <Box sx={{ display: 'flex', transform: 'rotate(-90deg)'}}>
                    <Typography variant="h6" color='#FFFFFF' width='max-content' marginLeft='-0.5em' marginRight='-0.5em'>YOUR LIST</Typography>
                </Box>
                <Box overflow='auto' height='100%'  display='flex' alignItems='center'>
                    <Stack direction='row' spacing='1.5em'>
                        <ListItem />
                        <ListItem />
                        <ListItem />
                        <ListItem />
                        <ListItem />
                        <ListItem />
                        <ListItem />
                        <ListItem />
                        
                    
                    </Stack>
                </Box>
            </Box>
        </Card>
    )
}

export default ListBlock;