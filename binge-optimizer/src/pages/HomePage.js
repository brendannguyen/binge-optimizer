import { Box, Stack, useMediaQuery } from '@mui/material';

import './HomePage.css'
import Grid from '@mui/material/Unstable_Grid2';
import SearchBlock from '../components/SearchBlock';
import ListBlock from '../components/ListBlock';
import DetailsBlock from '../components/DetailsBlock';
import TitleBlock from '../components/TitleBlock';
import RecommendedBlock from '../components/RecommendedBlock';
import TrendingBlock from '../components/TrendingBlock';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const customXL = useMediaQuery('(min-width:1730px)');

    // get local storage list or empty
    const [listItems, setListItems] = useState(() => {
        const savedListItems = localStorage.getItem('BO_listItems');
        return savedListItems ? JSON.parse(savedListItems) : [];
    });
    
    // saved to local storage
    useEffect(() => {
        localStorage.setItem('BO_listItems', JSON.stringify(listItems));
    }, [listItems])


    const [currentShownItem, setCurrentShownItem] = useState(() => {
        const savedCurrentItem = localStorage.getItem('BO_shownItem');
        return savedCurrentItem ? JSON.parse(savedCurrentItem) : null;
    });

    // saved to local storage
    useEffect(() => {
        if (currentShownItem) localStorage.setItem('BO_shownItem', JSON.stringify(currentShownItem));
    }, [currentShownItem])

    return (
        <Box justifyContent='center' alignItems='center' height='100vh' width='100vw' maxHeight='100vh' maxWidth='100vw'>
            <Grid container spacing='1.5em'  width='100%' height='100%' maxHeight='100%'  justifyContent='center' paddingLeft='1.5em' paddingTop='1.5em'>
                <Grid md={4} lg={3} xl={customXL ? 3 : 3} height='100%'><SearchBlock setListItems={setListItems} currentShownItem={currentShownItem} setCurrentShownItem={setCurrentShownItem}/></Grid>
                <Grid md={4} lg={3} xl={customXL ? 2 : 3} height='100%'>
                    <Stack direction='column' spacing='1.5em' sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <TitleBlock/>
                        <RecommendedBlock items={listItems} currentShownItem={currentShownItem} setListItems={setListItems} setCurrentShownItem={setCurrentShownItem} />
                    </Stack>
                </Grid>
                <Grid md={4} lg={6} xl={customXL ? 5: 6} height='100%' >
                    <Stack direction='column' spacing='1.5em' sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <ListBlock items={listItems} setListItems={setListItems} currentShownItem={currentShownItem} setCurrentShownItem={setCurrentShownItem} />
                        <DetailsBlock items={listItems} currentShownItem={currentShownItem} setListItems={setListItems}/>
                    </Stack>
                </Grid>
                <Grid lg={12} xl={customXL ? 2: 12} height={customXL ? '100%' : 'fit-content'}><TrendingBlock setListItems={setListItems} currentShownItem={currentShownItem} setCurrentShownItem={setCurrentShownItem} /></Grid>
            </Grid>
        </Box>
    )
}

export default HomePage;