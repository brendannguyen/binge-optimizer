import { Box, Card, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import ActorItem from "../items/ActorItem";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
    }
};

const ActorsBlock = (props) => {

    const [itemActors, setItemActors] = useState([]);
    const currentShownItem = props.currentShownItem;

    const fetchActors = async () => {
        if (currentShownItem) {
            // fetch actors
            fetch(`https://api.themoviedb.org/3/${currentShownItem.media_type}/${currentShownItem.id}/credits?language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                setItemActors(prevItem => {
                    if (prevItem.length === 0 || prevItem.id !== response.id) return response.cast;
                    else return prevItem;
                })
            })
            .catch(err => console.error(err))
            .then(() => sortItems());
        }
    };

    useEffect(() => {
        fetchActors();
    }, [currentShownItem])

    const sortItems = () => {
        setItemActors(prevItems => {
            const sortedItems = [...prevItems].sort((a, b) => b.popularity - a.popularity);
            return sortedItems;
        })
    }

    return (
        <Card raised sx={{bgcolor: '#2A2A2A', borderRadius: '10px', position: 'relative', zIndex: 0, flexGrow: 1, paddingLeft: '1.5em', paddingRight: '1.5em'}}>
            <Box overflow='auto' height='100%'  display='flex' alignItems='center' paddingBottom='1.5em' paddingTop='1.5em'>
                <Stack direction='row' spacing='1.5em' >
                    {itemActors.map((actor, index) => (
                        <ActorItem key={index} imageSrc={actor.profile_path} actorPop={actor.popularity} actorName={actor.name} actorId={actor.id}/>
                    ))}
                </Stack>
            </Box>
        </Card>
    )
}

export default ActorsBlock;