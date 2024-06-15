import { Card, Typography } from "@mui/material";

const ListItem = (props) => {
    return (
        <Card raised sx={{bgcolor: '#2A2A2A', padding: '0.5em', width: '170px', height: '155px', borderRadius: '10px', minWidth:'170px', minHeight: '155px'}}>
            <Typography variant="h8" color='white' sx={{color: 'white'}}>{props.title}</Typography>
        </Card>
    )
}

export default ListItem;