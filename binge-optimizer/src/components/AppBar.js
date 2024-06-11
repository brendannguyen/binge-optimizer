import { AppBar, Box, Toolbar, useScrollTrigger } from "@mui/material"

const CustomAppBar = () => {
    const isScroll = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return (
        <AppBar position="fixed" style={{backgroundColor: isScroll ? '#0C0C0C' : 'transparent', transition: '0.5s'}} elevation={isScroll ? 5: 0}>
            <Toolbar>
                BINGE OPTIMIZER
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar;