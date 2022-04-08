import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";

const UserItem = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 12, sm: 12, md: 12, xl: 12 }}
        >
          <Grid item xs={3} sm={3} md={3} xl={3}>
            <CardMedia
              sx={{ marginBottom: "15px", maxHeight: "100px", maxWidth: "75px" }}
              component="img"
              image={"http://localhost:5000/" + user.profile_image}
              alt="green iguana"
            />
          </Grid>
          <Grid item xs={9} sm={9} md={9} xl={9}>
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
