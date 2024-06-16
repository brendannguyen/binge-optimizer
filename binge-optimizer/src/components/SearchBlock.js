import { Box, Card, IconButton, InputAdornment, Stack, TextField, Tooltip } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import SearchItem from "./items/SearchItem";
import { useEffect, useState } from "react";

import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
    }
};

const SearchBlock = (props) => {

    const [searchItems, setSearchItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    const fetchContent = async (add) => {
        fetch(`https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=${totalPages}`, options)
        .then(response => response.json())
        .then(response => {
            const filteredItems = response.results.filter(item => item.media_type === 'tv' || item.media_type === 'movie');
            if (add) setSearchItems(prevItems => [...prevItems, ...filteredItems]);
            else setSearchItems(filteredItems);
        })
        .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchContent(false)
    }, [searchQuery]);

    useEffect(() => {
        fetchContent(true)
    }, [totalPages]);
    
    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', borderRadius: '10px', width:  '100%', height: '100%', display: 'flex', flexDirection: 'column', minWidth: 'fit-content'}}>
            <Box padding='1.5em'>
                <TextField 
                    variant='filled'
                    sx={{borderRadius: '10px', bgcolor: '#FFFFFF' }} 
                    fullWidth 
                    label='Search'
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><SearchIcon/></InputAdornment>
                        )
                    }}
                />
            </Box>
            <Box overflow='auto' marginBottom='1.5em'>
                <Stack  direction='column' spacing='1.5em' marginTop='-2em' alignItems='center' padding='2em'>
                    {searchItems.map((item) => (
                        <SearchItem  title={item.name || item.title} rating={item.vote_average} imageSrc={item.poster_path} id={item.id} type={item.media_type}/>
                    ))}
                    {
                        (searchItems.length > 0) && <Tooltip title="Search More"><IconButton
                            onClick={() => {
                                setTotalPages(prevTotal => prevTotal + 1);
                            }}><ExpandCircleDownIcon fontSize="large" sx={{color: "#FFFFFF"}}/></IconButton></Tooltip>
                    }
                </Stack>
            </Box>
        </Card>
    )

}

export default SearchBlock;