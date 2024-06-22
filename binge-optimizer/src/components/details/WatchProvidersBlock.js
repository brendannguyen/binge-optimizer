import { Box, Card, FormControl, InputLabel, MenuItem, Select, Stack, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import WatchProviderItem from "../items/WatchProviderItem";

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

const WatchProvidersBlock = (props) => {

    const [itemWatchProviders, setItemWatchProviders] = useState(null);
    const currentShownItem = props.currentShownItem;

    const fetchWatchProviders = async () => {
        // fetch watch providers
        if (currentShownItem) {
            fetch(`https://api.themoviedb.org/3/${currentShownItem.media_type}/${currentShownItem.id}/watch/providers`, options)
            .then(response => response.json())
            .then(response => {
                setItemWatchProviders(prevItem => {
                    if (!prevItem || prevItem.id !== response.id) return response;
                    else return prevItem;
                })
            })
            .catch(err => console.error(err));
        }
    }

    useEffect(() => {
        fetchWatchProviders();
    }, [currentShownItem])

    const [region, setRegion] = useState(() => {
        const savedRegion = localStorage.getItem('BO_region');
        return savedRegion ? JSON.parse(savedRegion) : 'AU';
    });

    const handleRegionChange = (event) => {
      setRegion(event.target.value);
    };

    // saved to local storage
    useEffect(() => {
        localStorage.setItem('BO_region', JSON.stringify(region));
    }, [region])
  
    return (
        <Card raised sx={{bgcolor: '#2A2A2A', borderRadius: '10px', position: 'relative', zIndex: 0, flexGrow: 1, paddingLeft: '1.5em', paddingRight: '1.5em', height: '100%'}}>
            <Box display='flex' flexDirection='row' alignItems='center' height='100%'>
                <ThemeProvider theme={theme}>
                    <FormControl size="small" variant="filled" sx={{ m: 1, minWidth: 80, borderRadius: '10px', bgcolor: '#FFFFFF', height: 'fit-content', marginRight: '1.5em' }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Region</InputLabel>
                        <Select
                        sx={{borderRadius: '10px', bgcolor: '#FFFFFF' }} 
                        fullWidth
                        value={region}
                        onChange={handleRegionChange}
                        autoWidth
                        label="Region"
                        >
                        <MenuItem value={region}>{region}</MenuItem>
                        {itemWatchProviders && Object.keys(itemWatchProviders.results).map(key => (
                            key !== region && <MenuItem key={key} value={key}>{key}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </ThemeProvider>
                <Box overflow='auto' height='100%'  display='flex' alignItems='center' >
                    <Stack direction='row' spacing='1em' >
                        {itemWatchProviders && itemWatchProviders.results[region] && itemWatchProviders.results[region].flatrate && itemWatchProviders.results[region].flatrate.map((watchProvider, index) => (
                            <WatchProviderItem key={index} imageSrc={watchProvider.logo_path}  watchProviderName={watchProvider.provider_name} />
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Card>
    )
}

export default WatchProvidersBlock;