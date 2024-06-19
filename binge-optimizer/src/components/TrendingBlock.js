import { Box, Card, IconButton, Stack, Tooltip, Typography, useMediaQuery } from "@mui/material";


import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { useEffect, useState } from "react";
import TrendingItem from "./items/TrendingItem";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
    }
};

const TrendingBlock = ({ setListItems, setCurrentShownItem, ...props }) => {

    const customXL = useMediaQuery('(min-width:1730px)');

    const [trendingItems, setTrendingItems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isInitialRender, setIsInitialRender] = useState(true);

    const fetchContent = async (add) => {
        fetch(`https://api.themoviedb.org/3/trending/all/week?language=en-US&page=${totalPages}`, options)
        .then(response => response.json())
        .then(response => {
            const filteredItems = response.results.filter(item => item.media_type === 'tv' || item.media_type === 'movie');
            if (add) setTrendingItems(prevItems => [...prevItems, ...filteredItems]);
            else setTrendingItems(filteredItems);
        })
        .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchContent(false)
    }, []);

    useEffect(() => {
        if (!isInitialRender) fetchContent(true)
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
            <Typography variant="h6" textAlign='center' color='#FFFFFF' marginTop='1em'>TRENDING</Typography>
            <Box overflow='auto' marginBottom='1.5em' marginTop='1em' marginRight={customXL ? '' : '1.5em'} marginLeft={customXL ? '' : '1.5em'}>
                <Stack direction= { customXL ? 'column' : 'row'} spacing='1.5em' marginTop='-2em' alignItems='center' padding='2em' paddingLeft={customXL ? '' : '0'}>
                    {trendingItems.map((item, index) => (
                            <TrendingItem index={index} currentShownItemId={props.currentShownItem ? props.currentShownItem.id : null} addItem={handleItemAdd} showItem={handleItemShow} title={item.name || item.title} rating={item.vote_average} imageSrc={item.poster_path} id={item.id} type={item.media_type} release_date={item.release_date} original_air_date={item.first_air_date} backdropSrc={item.backdrop_path}/>
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