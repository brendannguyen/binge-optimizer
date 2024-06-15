import { Box, Card, Stack, Typography } from "@mui/material";
import RecommendedItem from "./items/RecommendedItem";


const RecommendedBlock = () => {
    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', borderRadius: '10px', width:  '100%', height: '100%', display: 'flex', flexDirection: 'column', minWidth: 'max-content'}}>
            <Typography variant="h6" textAlign='center' color='#FFFFFF' marginTop='1em'>RECOMMENDED</Typography>
            <Box overflow='auto' marginBottom='1.5em' marginTop='1em'>
                <Stack  direction='column' spacing='1.5em' marginTop='-2em' alignItems='center' padding='2em'>
                    <RecommendedItem />
                    <RecommendedItem />
                    <RecommendedItem />
                    <RecommendedItem />
                    <RecommendedItem />
                    <RecommendedItem />
                    
                
                </Stack>
            </Box>
        </Card>
    )
}

export default RecommendedBlock;