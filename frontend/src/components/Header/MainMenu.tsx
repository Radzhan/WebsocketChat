import React from "react";
import { AppBar, Grid, styled, Toolbar, Typography } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import UserMenu from "./userMenu";
import AnonMenu from "./anonMenu";

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const MainMenu = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">Spotify</Link>
          </Typography>
          <Grid item>{user ? <UserMenu user={user} /> : <AnonMenu />}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MainMenu;
