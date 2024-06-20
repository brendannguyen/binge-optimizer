import { Box, Card, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import RecommendedItem from "./items/RecommendedItem";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { useEffect, useRef, useState } from "react";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
    }
};

const RecommendedBlock = ({setListItems, setCurrentShownItem, ...props}) => {

    const [recommendedItems, setRecommendedItems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const boxRef = useRef(null);

    const fetchRecommendations = async (reset) => {
        let page = totalPages;
        if (reset) {
            page = 1;
            setTotalPages(1);
            setRecommendedItems([])
        }
        if (props.items) {
            const fetchPromises = props.items.map(item => {
                return fetch(`https://api.themoviedb.org/3/${item.media_type}/${item.id}/recommendations?language=en-US&page=${page}`, options)
                .then(response => response.json())
                .then(response => {
                    setRecommendedItems(prevItems => {
                        const newItems = response.results.filter(newItem => !prevItems.some(prevItem => prevItem.id === newItem.id));
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

    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', borderRadius: '10px', width:  '100%', height: '100%', display: 'flex', flexDirection: 'column', minWidth: 'fit-content'}}>
            <Typography variant="h6" textAlign='center' color='#FFFFFF' marginTop='1em'>RECOMMENDED</Typography>
            <Box ref={boxRef} overflow='auto' marginBottom='1.5em' marginTop='1em'>
                <Stack  direction='column' spacing='1.5em' marginTop='-2em' alignItems='center' padding='2em'>
                    {recommendedItems.map((item, index) => (
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