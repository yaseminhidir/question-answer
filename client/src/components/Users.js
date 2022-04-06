import axios from "axios";
import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { Grid } from "@mui/material";
import Loading from "./Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function getUsers() {
    try {
      var res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data.data);
      setLoading(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  if (!loading) {
    return <Loading></Loading>;
  }
  
  return (
    <div>
      {" "}
      {error != null && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error"> {error} </Alert>
        </Stack>
      )}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12, xl:12}}>
        {users.map((user) => (
          <Grid item  xs={1} sm={4} md={4} xl={4} key={user._id}>
            <UserItem user={user}></UserItem>{" "}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Users;
