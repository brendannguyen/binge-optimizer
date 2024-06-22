import { Box, Card, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, Stack, ThemeProvider, Tooltip, Typography, createTheme } from "@mui/material";
import RecommendedItem from "./items/RecommendedItem";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { useEffect, useRef, useState } from "react";

import SortIcon from '@mui/icons-material/Sort';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
    }
};

const theme = createTheme({
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

const RecommendedBlock = ({setListItems, setCurrentShownItem, ...props}) => {

    const [recommendedItems, setRecommendedItems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const boxRef = useRef(null);

    const fetchRecommendations = async (reset) => {
        let page = totalPages;
        if (reset) {
            page = 1;
            setIsInitialRender(true);
            setRecommendedItems([]);
            setTotalPages(1);
        }
        if (props.items) {
            const fetchPromises = props.items.map(item => {
                return fetch(`https://api.themoviedb.org/3/${item.media_type}/${item.id}/recommendations?language=en-US&page=${page}`, options)
                .then(response => response.json())
                .then(response => {
                    setRecommendedItems(prevItems => {
                        const newItems = response.results.filter(newItem => !prevItems.some(prevItem => prevItem.id === newItem.id) && !props.items.some(item => item.id === newItem.id));
                        return [...prevItems, ...newItems];
                    });
                })
                .catch(err => console.error(err));
            });

            Promise.all(fetchPromises)
            .then(() => sortItems())
            .then(() => scrollToTop());
        }
    };

    const scrollToTop = () => {
        if (boxRef.current) boxRef.current.scrollTo({top: 0, behaviour: 'smooth'})
    };

    useEffect(() => {
        fetchRecommendations(true);
    }, [props.items]);

    useEffect(() => {
        if (!isInitialRender) {
            fetchRecommendations(false);
        }
        else setIsInitialRender(false);
    }, [totalPages]);

    const handleItemAdd = (index) => {
        setListItems(prevItems => {
            if (!prevItems.some(item => item.id === recommendedItems[index].id)) return [...prevItems, recommendedItems[index]];
            else return prevItems;
        });
    };

    const handleItemShow = (index) => {
        setCurrentShownItem(prevItem => {
            if (!prevItem || prevItem.id !== recommendedItems[index].id) return recommendedItems[index];
        })
    }

    const sortItems = () => {
        setRecommendedItems(prevItems => {
            const sortedItems = [...prevItems].sort((a, b) => b.vote_average - a.vote_average);
            return sortedItems;
        })
    }

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
            <Box display='flex' flexDirection='row'  justifyContent='center'>
                <Typography variant="h6" textAlign='center' color='#FFFFFF' marginTop='1em'>RECOMMENDED</Typography>
                {(recommendedItems && recommendedItems.length > 0) && <Tooltip title='Sort'><IconButton onClick={handleSortButtonClick} sx={{padding: 0, marginTop: '1em', marginLeft: '0.5em', height: 'fit-content'}}><SortIcon sx={{color: "#FFFFFF"}}/></IconButton></Tooltip>}
            </Box>
            <ThemeProvider theme={theme}>
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
            <Box ref={boxRef} overflow='auto' marginBottom='1.5em' marginTop='1em'>
                <Stack  direction='column' spacing='1.5em' marginTop='-2em' alignItems='center' padding='2em'>
                    {recommendedItems.filter(item => mediaType === 'any' || item.media_type === mediaType).map((item, index) => (
                        <RecommendedItem key={index} index={index} currentShownItemId={props.currentShownItem ? props.currentShownItem.id : null} addItem={handleItemAdd} showItem={handleItemShow} title={item.name || item.title} rating={item.vote_average} imageSrc={item.poster_path} id={item.id} type={item.media_type} release_date={item.release_date} original_air_date={item.first_air_date} backdropSrc={item.backdrop_path}/>
                    ))}
                    {
                        (recommendedItems.length > 0) && <Tooltip title="More Recommended"><IconButton
                            onClick={() => {
                                setTotalPages(prevTotal => prevTotal + 1);
                            }}><ExpandCircleDownIcon fontSize="large" sx={{color: "#FFFFFF"}}/></IconButton></Tooltip>
                    }

                </Stack>
            </Box>
        </Card>
    )
}

export default RecommendedBlock;