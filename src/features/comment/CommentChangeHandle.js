import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ConfirmDeleteComment from "./ConfirmDeleteComment";
import useAuth from "../../hooks/useAuth";

function CommentChangeHandle({ comment, postId, setIsCommentEdditing }) {
  const { user } = useAuth();

  const commentOwnerId = comment.author._id;
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const [openCommentDeleteBox, setOpenCommentDeleteBox] = useState(false);
  // const [openCommentEditBox, setOpenCommentEditBox] = useState(false);

  const handleCommentMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "delete-edit-comment";
  return (
    <>
      {commentOwnerId === user._id ? (
        <>
          <IconButton onClick={handleCommentMenuOpen}>
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
                setOpenCommentDeleteBox(true);
              }}
              sx={{ mx: 1 }}
            >
              Delete Comment
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleMenuClose();
                // setOpenCommentEditBox(true);
                setIsCommentEdditing(true);
              }}
              sx={{ mx: 1 }}
            >
              Edit Comment
            </MenuItem>
          </Menu>

          <ConfirmDeleteComment
            openConfirmBox={openCommentDeleteBox}
            setOpenConfirmBox={setOpenCommentDeleteBox}
            comment={comment}
            postId={postId}
          />
          {/* <EditComment
            openConfirmBox={openCommentEditBox}
            setOpenConfirmBox={setOpenCommentEditBox}
            comment={comment}
            postId={postId}
          /> */}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default CommentChangeHandle;
