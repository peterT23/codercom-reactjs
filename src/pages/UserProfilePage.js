import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import { Card, Container } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import { shallowEqual } from "react-redux";
import ProfileCover from "../features/user/ProfileCover";
import Profile from "../features/user/Profile";

function UserProfilePage() {
  const params = useParams();
  const userId = params.userid;
  const dispatch = useDispatch();
  const { selectedUser, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);
  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Card
            sx={{
              mb: 3,
              height: 280,
              position: "relative",
            }}
          >
            {selectedUser && <ProfileCover profile={selectedUser} />}
          </Card>
          {selectedUser && <Profile profile={selectedUser} />}
        </>
      )}
    </Container>
  );
}

export default UserProfilePage;
