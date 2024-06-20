import { Box, Card, IconButton, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import ReviewItem from "../items/ReviewItem";

import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
    }
};

const ReviewsBlock = (props) => {

    const currentShownItem = props.currentShownItem;
    const [itemReviews, setItemReviews] = useState([]);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const fetchReviews = async (reset) => {
        if (currentShownItem) {
            // fetch reviews
            let page = totalPages;
            if (reset) {
                page = 1;
                setTotalPages(1);
                setItemReviews([])
            }
            fetch(`https://api.themoviedb.org/3/${currentShownItem.media_type}/${currentShownItem.id}/reviews?language=en-US&page=${page}`, options)
            .then(response => response.json())
            .then(response => {
                setItemReviews(prevItem => [...prevItem, ...response.results])
            })
            .catch(err => console.error(err));
        }
    }

    useEffect(() => {
        fetchReviews(true);
    }, [currentShownItem])
    
    useEffect(() => {
        if (!isInitialRender) {
            fetchReviews(false)
        }
        else setIsInitialRender(false);
    }, [totalPages]);

    return (
        <Card raised sx={{bgcolor: '#2A2A2A', borderRadius: '10px', position: 'relative', zIndex: 0, flexGrow: 1, paddingLeft: '1.5em', paddingRight: '1.5em'}}>
            <Box overflow='auto' height='100%'  display='flex' alignItems='center' paddingBottom='1.5em' paddingTop='1.5em'>
                <Stack direction='row' spacing='1.5em' alignItems='center'>
                    {itemReviews && itemReviews.map((review, index) => (
                        <ReviewItem key={index} authorName={review.author} authorDetails={review.author_details} reviewContent={review.content} reviewUrl={review.url}/>
                    ))}
                    {
                    (itemReviews && itemReviews.length > 0) && <Tooltip title="Search More" sx={{height: 'fit-content'}}><IconButton
                        onClick={() => {
                            setTotalPages(prevTotal => prevTotal + 1);
                        }}><ExpandCircleDownIcon fontSize="large" sx={{color: "#FFFFFF", transform: 'rotate(-90deg)'}}/></IconButton></Tooltip>
                    }
                </Stack>
            </Box>
        </Card>
    )
}

export default ReviewsBlock;