import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {Link} from "react-router-dom"

const QuestionItem = ({ question }) => {

  return (
    <Box>
      <Card sx={{ marginBottom: "10px" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={2} sx={{ justifyContent: "end", display: "flex", lineHeight:"0.1" }}>
              <Box>
                {" "}
                <Typography
                  sx={{ fontSize: 12 }}
                  color="text.secondary"
             
                >
                  {question.likeCount} likes
                </Typography>{" "}
                <br></br>
                <Typography
                  sx={{ fontSize: 12 }}
                  color="text.secondary"
             
                >
                  {question.answerCount} answers
                </Typography>{" "}
              </Box>
            </Grid>
            <Grid item xs={10} sx={{ lineHeight:"0.1"}}>
              <Box>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
             
                >
                <Link to={"/question/" + question._id}> {question.title}</Link>  
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {question.content}
                </Typography>

              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </Box>
  );
};

export default QuestionItem;
