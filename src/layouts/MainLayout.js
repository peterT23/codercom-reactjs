import React from "react";
import { Box, Stack } from "@mui/material";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <AlertMsg />
      <Outlet />
      <Box sx={{ flexGrow: 1 }}></Box>
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
