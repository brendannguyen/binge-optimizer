import { Card } from "@mui/material";

const DetailsBlock = () => {
    return (
        <Card raised sx={{bgcolor: '#1E1E1E', '&:hover': {bgcolor: '#151515'}, transition: 'background-color 1s', padding: '1.5em', borderRadius: '10px', height: '100%'}}>
            
        </Card>
    )
}

export default DetailsBlock;