import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";

const UserItem = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 12, sm: 12, md: 12, xl:12}}>
          <Grid item xs={6} sm={5} md={5} xl={5}>
            <CardMedia
              sx={{ marginBottom: "15px"}}
              component="img"           
              height="100vh"
              width="100vw"
              image={"http://localhost:5000/" + user.profile_image}
              alt="green iguana"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} xl={6}>
            <Typography gutterBottom variant="body1" component="div">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.title}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserItem;
