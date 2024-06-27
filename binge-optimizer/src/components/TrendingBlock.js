import { Box, Card, IconButton, Menu, MenuItem, Skeleton, Stack, ThemeProvider, Tooltip, Typography, createTheme, useMediaQuery } from "@mui/material";


import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { useEffect, useRef, useState } from "react";
import TrendingItem from "./items/TrendingItem";

import AccessTimeIcon from '@mui/icons-material/AccessTime';

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


const TrendingBlock = ({ setListItems, setCurrentShownItem, ...props }) => {

    const customXL = useMediaQuery('(min-width:1730px)');

    const [trendingItems, setTrendingItems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isInitialRender, setIsInitialRender] = useState(true);

    const [anchorEl, setAnchorEl] = useState(null);
    const [timeWindow, setTimeWindow] = useState(() => {
        const savedTimeWindow = localStorage.getItem('BO_trendingTimeWindow');
        return savedTimeWindow ? JSON.parse(savedTimeWindow) : 'week';
    });

    // saved to local storage
    useEffect(() => {
        localStorage.setItem('BO_trendingTimeWindow', JSON.stringify(timeWindow));
    }, [timeWindow])

    const handleTimeWindowChange = (value) => {
        if (timeWindow !== value) setTimeWindow(value);
        setAnchorEl(null);
    };

    const handleTimeWindowButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const fetchContent = async (reset) => {
        let page = totalPages;
        if (reset) {
            page = 1;
            setTrendingItems([]);
            setTotalPages(1);
        }
        fetch(`https://api.themoviedb.org/3/trending/all/${timeWindow}?language=en-US&page=${page}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            const filteredItems = response.results.filter(item => item.media_type === 'tv' || item.media_type === 'movie');
            reset ? setTrendingItems(filteredItems) : setTrendingItems(prevItems => [...prevItems, ...filteredItems]);
        })
        .catch(err => console.error(err));
    };


    useEffect(() => {
        fetchContent(true)
    }, [timeWindow]);

    useEffect(() => {
        if (!isInitialRender && totalPages !== 1) fetchContent(false)
        else setIsInitialRender(false);
    }, [totalPages]);

    const handleItemAdd = (index) => {
        setListItems(prevItems => {
            if (!prevItems.some(item => item.id === trendingItems[index].id)) return [...prevItems, trendingItems[index]];
            else return prevItems;
        });
    };

    const handleItemShow = (index) => {
        setCurrentShownItem(prevItem => {
            if (!prevItem || prevItem.id !== trendingItems[index].id) return trendingItems[index];
        })
    }

    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', borderRadius: '10px', width:  '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Box display='flex' flexDirection='row'  justifyContent='center'>
                <Typography variant="h6" textAlign='center' color='#FFFFFF' marginTop='1em'>TRENDING</Typography>
                {(trendingItems && trendingItems.length > 0) && <Tooltip title='Time Window'><IconButton onClick={handleTimeWindowButtonClick} sx={{padding: 0, marginTop: '1em', marginLeft: '0.5em', height: 'fit-content'}}><AccessTimeIcon sx={{color: "#FFFFFF"}}/></IconButton></Tooltip>}
            </Box>
            <ThemeProvider theme={theme}>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => handleTimeWindowChange(timeWindow)}
                    >
                        <MenuItem onClick={() => handleTimeWindowChange(timeWindow)} sx={{bgcolor: '#A0153E'}}>{timeWindow.charAt(0).toUpperCase() + timeWindow.slice(1)}</MenuItem>
                        {(timeWindow !== 'day') && <MenuItem onClick={() => handleTimeWindowChange('day')}>Day</MenuItem>}
                        {(timeWindow !== 'week') && <MenuItem onClick={() => handleTimeWindowChange('week')}>Week</MenuItem> }
                    </Menu>
            </ThemeProvider>
            <Box overflow='auto' marginBottom='1.5em' marginTop='1em' marginRight={customXL ? '' : '1.5em'} marginLeft={customXL ? '' : '1.5em'}>
                <Stack direction= { customXL ? 'column' : 'row'} spacing='1.5em' marginTop='-2em' alignItems='center' padding='2em' paddingLeft={customXL ? '' : '0'}>
                    {(trendingItems.length === 0) &&
                        <>
                        <Skeleton variant="rounded" width='100%' height='155px' animation='wave' sx={{minWidth: '180px', borderRadius: '10px', bgcolor: '#2A2A2A'}} />
                        <Skeleton variant="rounded" width='100%' height='155px' animation='wave' sx={{minWidth: '180px', borderRadius: '10px', bgcolor: '#232323'}} />
                        <Skeleton variant="rounded" width='100%' height='155px' animation='wave' sx={{minWidth: '180px', borderRadius: '10px', bgcolor: '#1E1E1E'}} />
                        </>
                    }
                    {trendingItems.map((item, index) => (
                            <TrendingItem key={index} index={index} currentShownItemId={props.currentShownItem ? props.currentShownItem.id : null} addItem={handleItemAdd} showItem={handleItemShow} title={item.name || item.title} rating={item.vote_average} imageSrc={item.poster_path} id={item.id} type={item.media_type} release_date={item.release_date} original_air_date={item.first_air_date} backdropSrc={item.backdrop_path}/>
                        ))}
                        {
                            (trendingItems.length > 0) && <Tooltip title="More Trending"><IconButton
                                onClick={() => {
                                    setTotalPages(prevTotal => prevTotal + 1);
                                }}><ExpandCircleDownIcon fontSize="large" sx={{color: "#FFFFFF"}}/></IconButton></Tooltip>
                    }
                </Stack>
            </Box>
        </Card>
    )
}

export default TrendingBlock;