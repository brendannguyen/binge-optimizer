import { Box, Card, InputAdornment, Stack, TextField } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import SearchItem from "./items/SearchItem";



const SearchBlock = (props) => {
    
    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', borderRadius: '10px', width:  '100%', height: '100%', display: 'flex', flexDirection: 'column', minWidth: 'fit-content'}}>
            <Box padding='1.5em'>
                <TextField 
                    variant='filled'
                    sx={{borderRadius: '10px', bgcolor: '#FFFFFF' }} 
                    fullWidth 
                    label='Search'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><SearchIcon/></InputAdornment>
                        )
                    }}
                />
            </Box>
            <Box overflow='auto' marginBottom='1.5em'>
                <Stack  direction='column' spacing='1.5em' marginTop='-2em' alignItems='center' padding='2em'>
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />

                    <SearchItem />
                    <SearchItem />
                    
                    
                
                </Stack>
            </Box>
        </Card>
    )

}

export default SearchBlock;