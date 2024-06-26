import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
    }
};

const ExtendedItem = (props) => {

    const [show, setShow] = useState(false);

    const videoOptions = {
        height: '155px',
        width: '254px',
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          showinfo: 0,
          mute: 1,
          loop: 1,
        }
    };

    const [videoID, setVideoID] = useState('');

    const _onReady = () => {
        setShow(false)
    }

    const _onPlay = (event) => {
        if (event.target && event.target.playVideo) {
            event.target.setVolume(20);
            event.target.unMute();
        }
        setShow(true);
    }

    const fetchVideo = async () => {
        fetch(`https://api.themoviedb.org/3/${props.type}/${props.id}/videos?language=en-US`, options)
        .then(response => response.json())
        .then(response => {
            if (response.results && response.results.length > 0) {
                let firstTrailer = response.results.find(item => item.type === 'Trailer');
                if (firstTrailer) setVideoID(firstTrailer.key)
                else setVideoID(response.results[0].key)
            }
        })
        .catch(err => console.error(err));


    };

    useEffect(() => {
        fetchVideo();
    }, []);

    return (
        videoID !== '' && props.id ? (
        <Box bgcolor='transparent' sx={{opacity: show ? 1 : 0 , transition: 'opacity 2s ease'}} height='155px' borderRadius='10px'>
            {videoID && <YouTube videoId={videoID} opts={videoOptions} onReady={_onReady} onPlay={_onPlay} style={{borderRadius: '10px', overflow: 'hidden', height: '100%', boxShadow: '0px 0px 10px rgba(0, 0, 0, .5)'}}/> }
        </Box>
        ) : <></>
    )
}

export default ExtendedItem;