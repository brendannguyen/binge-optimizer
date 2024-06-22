import { Box, Card, IconButton, InputAdornment, Menu, MenuItem, Stack, TextField, ThemeProvider, Tooltip, createTheme } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import SearchItem from "./items/SearchItem";
import { useEffect, useState } from "react";

import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import SortIcon from '@mui/icons-material/Sort';

const theme = createTheme({
    palette: {
        primary: {
        main: '#A0153E',
        },
    },
});

const sortMenuTheme = createTheme({
    palette: {
        primary: {
        main: '#A0153E',
        },
    },
    components: {
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#2A2A2A',
                    maxHeight: '200px'  
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    backgroundColor: '#2A2A2A',
                    '&.Mui-selected': {
                    backgroundColor: '#A0153E', 
                    },
                },
            },
        },
    },
});
  

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
    }
};

const SearchBlock = ({ setListItems, setCurrentShownItem, ...props }) => {

    const [searchItems, setSearchItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState(() => {
        const savedSearchQuery = localStorage.getItem('BO_recentSearchQuery');
        return savedSearchQuery ? JSON.parse(savedSearchQuery) : '';
    });
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const fetchContent = async (reset) => {
        let page = totalPages;
        if (reset) {
            page = 1;
            setIsInitialRender(true);
            setTotalPages(1);
        }
        fetch(`https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`, options)
        .then(response => response.json())
        .then(response => {
            const filteredItems = response.results.filter(item => item.media_type === 'tv' || item.media_type === 'movie');
            reset ? setSearchItems(filteredItems) : setSearchItems(prevItems => [...prevItems, ...filteredItems]);
        })
        .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchContent(true)
    }, [searchQuery]);

    useEffect(() => {
        if (!isInitialRender) fetchContent(false)
        else setIsInitialRender(false);
    }, [totalPages]);

    const handleItemAdd = (index) => {
        setListItems(prevItems => {
            if (!prevItems.some(item => item.id === searchItems[index].id)) return [...prevItems, searchItems[index]];
            else return prevItems;
        });
    };

    const handleItemShow = (index) => {
        setCurrentShownItem(prevItem => {
            if (!prevItem || prevItem.id !== searchItems[index].id) return searchItems[index];
        })
    };

    // saved to local storage
    useEffect(() => {
        localStorage.setItem('BO_recentSearchQuery', JSON.stringify(searchQuery));
    }, [searchQuery])

    const [anchorEl, setAnchorEl] = useState(null);
    const [mediaType, setMediaType] = useState('any');

    const handleSortChange = (value) => {
        if (mediaType !== value) setMediaType(value);
        setAnchorEl(null);
    };

    const handleSortButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    
    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', borderRadius: '10px', width:  '100%', height: '100%', display: 'flex', flexDirection: 'column', minWidth: 'fit-content'}}>
            <Box padding='1.5em'>
                <ThemeProvider theme={theme}>
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
                        ),
                        endAdornment: (
                            <InputAdornment position="end"><IconButton><SortIcon onClick={handleSortButtonClick}/></IconButton></InputAdornment>
                        )
                    }}
                />
                </ThemeProvider>
                <ThemeProvider theme={sortMenuTheme}>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => handleSortChange(mediaType)}
                    >
                        <MenuItem onClick={() => handleSortChange(mediaType)} sx={{bgcolor: '#A0153E'}}>{mediaType === 'movie' && 'Movies' || mediaType === 'tv' && 'TV Shows' || 'Any'}</MenuItem>
                        {(mediaType !== 'any') && <MenuItem onClick={() => handleSortChange('any')}>Any</MenuItem>}
                        {(mediaType !== 'movie') && <MenuItem onClick={() => handleSortChange('movie')}>Movies</MenuItem> }
                        {(mediaType !== 'tv') &&<MenuItem onClick={() => handleSortChange('tv')}>TV Shows</MenuItem>}
                    </Menu>
                </ThemeProvider>
            </Box>
            <Box overflow='auto' marginBottom='1.5em'>
                <Stack  direction='column' spacing='1.5em' marginTop='-2em' alignItems='center' padding='2em'>
                    {searchItems.filter(item => mediaType === 'any' || item.media_type === mediaType).map((item, index) => (
                        <SearchItem key={index} index={index} currentShownItemId={props.currentShownItem ? props.currentShownItem.id : null} addItem={handleItemAdd} showItem={handleItemShow} title={item.name || item.title} rating={item.vote_average} imageSrc={item.poster_path} id={item.id} type={item.media_type} release_date={item.release_date} original_air_date={item.first_air_date} backdropSrc={item.backdrop_path}/>
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