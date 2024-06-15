import { Card, Typography } from "@mui/material";

const RecommendedItem = (props) => {
    return (
        <Card raised sx={{bgcolor: '#2A2A2A', padding: '0.5em', minWidth: '170px', height: '155px', borderRadius: '10px', width: '100%'}}>
            <Typography variant="h8" color='white' sx={{color: 'white'}}>{props.title}</Typography>
        </Card>
    )
}

export default RecommendedItem;
