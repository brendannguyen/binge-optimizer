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
    const largeSize = useMediaQuery('(min-width:1200px)');
    const smallSize = useMediaQuery('(min-width:600px)');

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

    // saved to local storage and remove from local storage
    useEffect(() => {
        if (currentShownItem) localStorage.setItem('BO_shownItem', JSON.stringify(currentShownItem));
        else localStorage.removeItem('BO_shownItem');
    }, [currentShownItem])

    return (
        <Box justifyContent='center' alignItems='center' height='100vh' width='100vw' maxHeight='100vh' maxWidth='100vw'>
            <Grid container spacing='1.5em'  width='100%' height='100%' maxHeight='100%'  justifyContent='center' paddingLeft='1.5em' paddingTop='1.5em'>
                {!smallSize && <Grid xs={12} alignItems='center'><TitleBlock/></Grid>}
                <Grid xs={12} sm={6} md={6} lg={3} xl={customXL ? 3 : 3} height= {largeSize ? '100%' : '50%'} minHeight='350px'><SearchBlock setListItems={setListItems} currentShownItem={currentShownItem} setCurrentShownItem={setCurrentShownItem}/></Grid>
                <Grid xs={12} sm={6} md={6} lg={3} xl={customXL ? 2 : 3} height= {largeSize ? '100%' : '50%'} minHeight='350px'>
                    <Stack direction='column' spacing='1.5em' sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                        {smallSize && <TitleBlock/>}
                        <RecommendedBlock items={listItems} currentShownItem={currentShownItem} setListItems={setListItems} setCurrentShownItem={setCurrentShownItem} />
                    </Stack>
                </Grid>
                <Grid md={12} lg={6} xl={customXL ? 5: 6} height='100%' minHeight='650px'>
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