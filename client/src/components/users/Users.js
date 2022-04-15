import axios from "axios";
import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { Grid } from "@mui/material";
import Loading from "../Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function getUsers() {
    try {
      var res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data.data);
      setLoading(true);
      setError(null);
      console.log(res.data.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  function blockErrorHandler(data) {
    setError(data);
  }
  
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
      <Grid
        container
        spacing={{ xs: 2, md: 1 }}
        columns={{ xs: 12, sm: 12, md: 12, xl: 12 }}
      >
        {users.map((user) => (
          <Grid item xs={6} sm={6} md={4} xl={3} key={user._id}>
            <UserItem
              user={user}
              getUsers={getUsers}
              blockErrorHandler={blockErrorHandler}
            ></UserItem>{" "}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Users;
