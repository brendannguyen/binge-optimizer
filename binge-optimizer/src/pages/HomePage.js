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

    const [listItems, setListItems] = useState([]);
    

    useEffect(() => {
        console.log(listItems)
    }, [listItems])


    return (
        <Box justifyContent='center' alignItems='center' height='100vh' width='100vw' maxHeight='100vh' maxWidth='100vw'>
            <Grid container spacing='1.5em'  width='100%' height='100%' maxHeight='100%'  justifyContent='center' paddingLeft='1.5em' paddingTop='1.5em'>
                <Grid md={4} lg={3} xl={customXL ? 3 : 3} height='100%'><SearchBlock setListItems={setListItems}/></Grid>
                <Grid md={4} lg={3} xl={customXL ? 2 : 3} height='100%'>
                    <Stack direction='column' spacing='1.5em' sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <TitleBlock/>
                        <RecommendedBlock/>
                    </Stack>
                </Grid>
                <Grid md={4} lg={6} xl={customXL ? 5: 6} height='100%' >
                    <Stack direction='column' spacing='1.5em' sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <ListBlock items={listItems} setListItems={setListItems} />
                        <DetailsBlock/>
                    </Stack>
                </Grid>
                <Grid lg={12} xl={customXL ? 2: 12} height={customXL ? '100%' : 'fit-content'}><TrendingBlock /></Grid>
            </Grid>
        </Box>
    )
}

export default HomePage;