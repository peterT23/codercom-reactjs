import React, { useState } from "react";
import { Stack, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useDispatch } from "react-redux";
import { editComment } from "./commentSlice";

function EditComment({ comment, postId, setIsCommentEdditing }) {
  const [newContent, setNewContent] = useState(comment.content);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editComment({ newContent, comment, postId }));
    setNewContent("");
    setIsCommentEdditing(false);
  };

  const keyCode = (event) => {
    if (event.keyCode === 27) {
      setIsCommentEdditing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row">
        <TextField
          onKeyDown={keyCode}
          fullWidth
          size="small"
          value={newContent}
          placeholder="Write a comment…"
          onChange={(event) => setNewContent(event.target.value)}
          autoFocus
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: (theme) =>
                `${theme.palette.grey[500_32]} !important`,
            },
          }}
        />
        <IconButton type="submit">
          <SendIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Typography sx={{ fontSize: "0.8rem", color: "green" }} color="initial">
          Press Esc to cancel
        </Typography>
      </Stack>
    </form>
  );
}

export default EditComment;
