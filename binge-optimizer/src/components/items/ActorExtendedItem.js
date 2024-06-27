import { Box, Card, CardMedia, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
    }
};

const ActorExtendedItem = (props) => {

    const [actorDetails, setActorDetails] = useState(null);

    const fetchActorDetails = async () => {
        if (props.id) {
            // fetch actors
            fetch(`https://api.themoviedb.org/3/person/${props.id}?language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                setActorDetails(prevItem => {
                    if (!prevItem || prevItem.id !== response.id) return response;
                    else return prevItem;
                })
            })
            .catch(err => console.error(err));
        }
    };

    useEffect(() => {
        fetchActorDetails();
    }, []);

    return (
        <Card sx={{bgcolor: '#0E0E0E', padding: '0.5em', minWidth: '320px',  height: '155px', borderRadius: '10px'}}>
            {!actorDetails &&
                <Box display='flex' flexDirection='row' justifyContent='space-between' maxWidth='100%' height='100%' alignItems='center' zIndex={1}>
                    <Skeleton variant="rounded" height='100%' width='160px' sx={{bgcolor: '#2A2A2A', maxWidth: '35%'}}/>
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100%' marginLeft='0.5em'>
                        <Skeleton variant="text" width='150px' height='50px' sx={{bgcolor: '#2A2A2A', maxWidth: '100%'}}/>
                        <Skeleton variant="text" width='150px' sx={{bgcolor: '#2A2A2A', maxWidth: '100%'}}/>
                        <Skeleton variant="text" width='150px' sx={{bgcolor: '#2A2A2A', maxWidth: '100%'}}/>
                    </Box>
                </Box>
            }
            {actorDetails &&
            <Box display='flex' flexDirection='row' justifyContent='space-between' maxWidth='100%' height='100%' alignItems='center' zIndex={1}>
                <CardMedia component='img' src={'https://image.tmdb.org/t/p/w500' + actorDetails.profile_path} height='100%' sx={{borderRadius: '10px', maxWidth: 'fit-content'}} />
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100%' marginLeft='0.5em'>
                    <Typography variant="h6" color='#FFFFFF'>{actorDetails.name}</Typography>
                    <Typography variant="body" color='#FFFFFF'>{actorDetails.birthday}</Typography>
                    <Typography variant="body" color='#FFFFFF'>{actorDetails.place_of_birth}</Typography>
                </Box>
            </Box>
            }
        </Card>
    )
}

export default ActorExtendedItem;