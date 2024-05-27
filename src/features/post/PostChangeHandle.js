import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ConfirmDeletePost from "./ConfirmDeletePost";
import PostEdit from "./PostEdit";

function PostChangeHandle({ post }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const [openEditBox, setOpenEditBox] = useState(false);

  const handlePostMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "delete-edit-posts";

  return (
    <>
      <IconButton onClick={handlePostMenuOpen}>
        <MoreVertIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            setOpenDeleteBox(true);
          }}
          sx={{ mx: 1 }}
        >
          Delete Post
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleMenuClose();
            setOpenEditBox(true);
          }}
          sx={{ mx: 1 }}
        >
          Edit Post
        </MenuItem>
      </Menu>

      <ConfirmDeletePost
        openConfirmBox={openDeleteBox}
        setOpenConfirmBox={setOpenDeleteBox}
        postId={post._id}
      />
      <PostEdit
        openEditBox={openEditBox}
        setOpenEditBox={setOpenEditBox}
        post={post}
      />
    </>
  );
}

export default PostChangeHandle;
