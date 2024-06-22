import { Box, Card, IconButton, SvgIcon, Tooltip, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import PosterBlock from "./details/PosterBlock";
import DescriptionBlock from "./details/DescriptionBlock";
import ActorsBlock from "./details/ActorsBlock";
import WatchProvidersBlock from "./details/WatchProvidersBlock";
import StatsBlock from "./details/StatsBlock";
import ReviewsBlock from "./details/ReviewsBlock";
import { useEffect, useState } from "react";

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { ReactComponent as TMBDIcon} from '../assets/tmdb.svg';

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
    const smallSize = useMediaQuery('(min-width:600px)');

    const [itemDetails, setItemDetails] = useState(null);
    const [itemDirector, setItemDirector] = useState(null);
    const [itemTrailers, setItemTrailers] = useState(null);

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
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [currentShownItem])

    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', borderRadius: '10px', height: '100%', display: 'flex', flexDirection: 'column'}}>
            {currentShownItem ?
            <Box justifyContent='center' alignItems='center' width='100%' height='100%' maxHeight='100%' maxWidth='100%' marginTop='1.5em' marginBottom='1.5em' overflow='auto'>
                <Grid container spacing='1.5em' rowGap='0' justifyContent='center' maxWidth='100%' marginLeft='1.5em' marginRight='1.5em'>
                    <Grid md={12} lg={12} xl={12} height='fit-content' width='100%' ><Box display='flex' flexDirection= {smallSize ? 'row' : 'column'} >{smallSize && <PosterBlock imageSrc={currentShownItem.poster_path}/>}<DescriptionBlock itemDetails={itemDetails} type={currentShownItem.media_type} itemDirector={itemDirector} itemTrailers={itemTrailers}/></Box></Grid>
                    <Grid md={12} lg={12} xl={12} height='fit-content' ><ActorsBlock currentShownItem={currentShownItem} /></Grid>
                    <Grid xl={customXL ? 6 : 6}><WatchProvidersBlock currentShownItem={currentShownItem}/></Grid>
                    <Grid xl={customXL ? 6 : 6}><StatsBlock itemDetails={itemDetails} type={currentShownItem.media_type}/></Grid>
                    <Grid xl={customXL ? 12 : 12}><ReviewsBlock currentShownItem={currentShownItem}/></Grid>
                </Grid>
            </Box>
            :
            <Box height='100%'  justifyContent='center' alignItems='center' display='flex' padding='1.5em'>
                <Card raised sx={{bgcolor: '#2A2A2A', borderRadius: '10px', position: 'relative', zIndex: 0, flexGrow: 1, paddingLeft: '1.5em', paddingRight: '1.5em', maxWidth: 'fit-content', maxHeight: 'fit-content'}} >
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' padding='1.5em'>
                        <Typography variant="h4" textAlign='center' gutterBottom color='#A0153E'>BINGE OPTIMIZER</Typography>
                        <Typography variant="body" textAlign='center' gutterBottom color='#FFFFFF'>Get recommendations based on your chosen list of movies and TV shows. Simple.</Typography>
                        <Typography variant="body" textAlign='center' gutterBottom color='#5C5B5B'>This product uses the TMDB API but is not endorsed or certified by TMDB (watch provider data from JustWatch).</Typography>
                        <Tooltip sx={{maxWidth: 'fit-content'}} title='TMDB'><IconButton  href={'https://www.themoviedb.org/'} target="_blank" ><SvgIcon component={TMBDIcon} inheritViewBox fontSize='large'/></IconButton></Tooltip>
                        <Typography variant="h6" textAlign='center' gutterBottom color='#FFFFFF'>By: Brendan Nguyen</Typography>
                        <Box display='flex' flexDirection='row'>
                            <Tooltip sx={{maxWidth: 'fit-content'}} title='Portfolio Website'><IconButton  href={'https://brendannguyen.vercel.app/'} target="_blank"><OpenInNewIcon sx={{color: '#FFFFFF'}} /></IconButton></Tooltip>
                            <Tooltip sx={{maxWidth: 'fit-content'}} title='Buy Me A Coffee'><IconButton  href={'https://buymeacoffee.com/brendannguyen'} target="_blank"><VolunteerActivismIcon sx={{color: '#FFFFFF'}} /></IconButton></Tooltip>
                            <Tooltip sx={{maxWidth: 'fit-content'}} title='GitHub'><IconButton  href={'https://github.com/brendannguyen/binge-optimizer'} target="_blank"><GitHubIcon sx={{color: '#FFFFFF'}} /></IconButton></Tooltip>
                        </Box>
                    </Box>
                </Card>
            </Box>
            }
        </Card>
    )
}

export default DetailsBlock;