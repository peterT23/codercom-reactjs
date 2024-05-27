import React, { useState } from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import CommentChangeHandle from "./CommentChangeHandle";
import EditComment from "./EditComment";

function CommentCard({ comment, postId }) {
  const [isCommentEdditing, setIsCommentEdditing] = useState(false);
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          {!isCommentEdditing ? (
            <>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {comment.author?.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                {fDate(comment.createdAt)}
              </Typography>
              <CommentChangeHandle
                comment={comment}
                postId={postId}
                setIsCommentEdditing={setIsCommentEdditing}
              />
            </>
          ) : (
            <EditComment
              postId={postId}
              comment={comment}
              setIsCommentEdditing={setIsCommentEdditing}
            />
          )}
        </Stack>
        {!isCommentEdditing ? (
          <>
            {" "}
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {comment.content}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <CommentReaction comment={comment} />
            </Box>
          </>
        ) : (
          <></>
        )}
      </Paper>
    </Stack>
  );
}

export default CommentCard;
