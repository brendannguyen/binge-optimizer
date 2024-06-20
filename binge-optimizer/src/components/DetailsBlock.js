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
    const [itemDirector, setItemDirector] = useState(null);
    const [itemTrailers, setItemTrailers] = useState(null);

    const [itemReviews, setItemReviews] = useState([]);

    const fetchDetails = async () => {
        if (currentShownItem) {
            // fetch details, credits, and videos
            fetch(`https://api.themoviedb.org/3/${currentShownItem.media_type}/${currentShownItem.id}?append_to_response=credits%2Cvideos&language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                setItemDetails(prevItem => {
                    if (!prevItem || prevItem.id !== response.id) return response;
                    else return prevItem;
                })
                setItemDirector(prevItem => {
                    if (!prevItem || prevItem.id !== response.id) {
                        const director = response.credits.crew.find(crewMember => crewMember.job === "Director");
                        return {director: director, id: response.id};
                    }
                    else return prevItem;
                })
                setItemTrailers(prevItem => {
                    if (!prevItem || prevItem.id !== response.id) {
                        const videos = response.videos.results.filter(item => item.type === "Trailer");
                        return {trailers: videos, id: response.id};
                    }
                    else return prevItem;
                })
            })
            .catch(err => console.error(err));

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
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', borderRadius: '10px', height: '100%', display: 'flex', flexDirection: 'column'}}>
            {currentShownItem ?
            <Box justifyContent='center' alignItems='center' width='100%' height='100%' maxHeight='100%' maxWidth='100%' marginTop='1.5em' marginBottom='1.5em' overflow='auto'>
                <Grid container spacing='0' rowGap='1.5em' justifyContent='center' maxWidth='100%' marginLeft='1.5em' marginRight='1.5em'>
                    <Grid md={12} lg={12} xl={12} height='fit-content' width='100%' ><Box display='flex' flexDirection='row' ><PosterBlock imageSrc={currentShownItem.poster_path}/><DescriptionBlock itemDetails={itemDetails} type={currentShownItem.media_type} itemDirector={itemDirector} itemTrailers={itemTrailers}/></Box></Grid>
                    <Grid md={12} lg={12} xl={12} height='fit-content' ><ActorsBlock currentShownItem={currentShownItem} /></Grid>
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