import { Modal, Box, Typography, Button, Divider } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ConfirmDeleteComment({
  comment,
  openConfirmBox,
  setOpenConfirmBox,
  postId,
}) {
  const handleClose = () => setOpenConfirmBox(false);

  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    setOpenConfirmBox(false);
    dispatch(deleteComment({ comment, postId }));
  };
  return (
    <>
      <Modal
        keepMounted
        open={openConfirmBox}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} justifyContent="center" alignItems="center">
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this comment?{" "}
          </Typography>
          <Divider></Divider>
          <Box
            sx={{
              mt: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "30px",
            }}
          >
            <Button variant="contained" onClick={handleDeleteComment}>
              Yes
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ConfirmDeleteComment;
