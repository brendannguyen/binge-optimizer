import { Box } from '@mui/material';

import './HomePage.css'
import Grid from '@mui/material/Unstable_Grid2';
import MediaSelector from '../components/MediaSelector';
import OptionsViewer from '../components/OptionsViewer';
import ChosenMedia from '../components/ChosenMedia';

const HomePage = () => {
    return (
        <Box display='flex' justifyContent='center' alignItems='center' zIndex={1} sx={{ flexGrow: 1 }} minHeight='100vh' minWidth='100vw'>
            <Grid container spacing={2}>
                <Grid xs={4} ><MediaSelector/></Grid>
                <Grid xs={4} ><ChosenMedia/></Grid>
                <Grid xs={4} ><OptionsViewer/></Grid>
            </Grid>
        </Box>
    )
}

export default HomePage;