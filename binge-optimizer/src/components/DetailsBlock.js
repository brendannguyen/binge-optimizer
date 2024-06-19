import { Box, Card, Stack, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import PosterBlock from "./details/PosterBlock";
import DescriptionBlock from "./details/DescriptionBlock";
import ActorsBlock from "./details/ActorsBlock";
import WatchProvidersBlock from "./details/WatchProvidersBlock";
import StatsBlock from "./details/StatsBlock";
import ReviewsBlock from "./details/ReviewsBlock";
import { useEffect, useState } from "react";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
    }
};

const DetailsBlock = ({ setListItems, ...props }) => {
    const customXL = useMediaQuery('(min-width:1730px)');
    const currentShownItem = props.currentShownItem;

    const [itemDetails, setItemDetails] = useState(null);
    const [itemActors, setItemActors] = useState([]);
    const [itemWatchProviders, setItemWatchProviders] = useState([]);
    const [itemReviews, setItemReviews] = useState([]);

    const fetchDetails = async () => {
        if (currentShownItem) {
            // fetch details
            fetch(`https://api.themoviedb.org/3/${currentShownItem.media_type}/${currentShownItem.id}?language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                setItemDetails(prevItem => {
                    console.log(response)
                    if (!prevItem || prevItem.id !== response.id) return response;
                    else return prevItem;
                })
            })
            .catch(err => console.error(err));

            // // fetch actors
            // fetch(`https://api.themoviedb.org/3/${currentShownItem.media_type}/${currentShownItem.id}/credits?language=en-US`, options)
            // .then(response => response.json())
            // .then(response => {
            //     setItemActors(prevItem => {
            //         if (!prevItem || currentShownItem.id !== response.id) return response.cast;
            //         else return prevItem;
            //     })
            // })
            // .catch(err => console.error(err));

            // // fetch watch providers
            // fetch(`https://api.themoviedb.org/3/${currentShownItem.media_type}/${currentShownItem.id}/watch/providers`, options)
            // .then(response => response.json())
            // .then(response => {
            //     setItemWatchProviders(prevItem => {
            //         if (!prevItem || currentShownItem.id !== response.id) return response.results;
            //         else return prevItem;
            //     })
            // })
            // .catch(err => console.error(err));

            // // fetch reviews
            // fetch(`https://api.themoviedb.org/3/${currentShownItem.media_type}/${currentShownItem.id}/reviews?language=en-US&page=1`, options)
            // .then(response => response.json())
            // .then(response => {
            //     setItemReviews(prevItem => {
            //         if (!prevItem || currentShownItem.id !== response.id) return response.results;
            //         else return prevItem;
            //     })
            // })
            // .catch(err => console.error(err));
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [currentShownItem])

    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', padding: '1.5em', borderRadius: '10px', height: '100%'}}>
            {currentShownItem ?
            <Box justifyContent='center' alignItems='center' height='100%' width='100%' maxHeight='100%' maxWidth='100%'>
            <Grid container spacing='1.5em'  width='100%' height='100%' maxHeight='100%'  justifyContent='center'>
                <Grid md={12} lg={12} xl={12} height='fit-content'><Box display='flex' flexDirection='row' marginRight='-1.5em'><PosterBlock imageSrc={currentShownItem.poster_path}/><DescriptionBlock itemDetails={itemDetails} type={currentShownItem.media_type}/></Box></Grid>
                <Grid xl={customXL ? 12 : 12}><ActorsBlock currentShownItem={currentShownItem} /></Grid>
                <Grid xl={customXL ? 6 : 6}><WatchProvidersBlock currentShownItem={currentShownItem}/></Grid>
                <Grid xl={customXL ? 6 : 6}><StatsBlock itemDetails={itemDetails}/></Grid>
                <Grid xl={customXL ? 12 : 12}><ReviewsBlock currentShownItem={currentShownItem}/></Grid>
            </Grid>
            </Box> 
            :
            <Box></Box>
            }
        </Card>
    )
}

export default DetailsBlock;