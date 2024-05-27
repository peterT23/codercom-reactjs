import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { COMMENTS_PER_POST } from "../../app/config";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  commentsById: {},
  commentsByPost: {},
  currentPageByPost: {},
  totalCommentsByPost: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess: (state, action) => {
      state.isLoading = false;
      state.error = "";
      // const { data } = action.payload;
      // state.commentsById[data._id] = data;
      // state.commentsByPost[data.post].push(data._id);
      // state.totalCommentsByPost[data.post] += 1;
    },
    getCommentsSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      const { postId, data, page } = action.payload;

      data.comments.forEach(
        (comment) => (state.commentsById[comment._id] = comment)
      );
      state.commentsByPost[postId] = data.comments
        .map((comment) => comment._id)
        .reverse();
      state.totalCommentsByPost[postId] = data.count;
      state.currentPageByPost[postId] = page;
    },
    sendCommentReactionSuccess: (state, action) => {
      state.isLoading = false;
      state.error = "";
      const { commentId, reactions } = action.payload;

      state.commentsById[commentId].reactions = reactions.data;
    },
    deleteCommentSuccess: (state, action) => {
      state.isLoading = false;
      state.error = "";

      // const { comment, postId } = action.payload;
      // state.commentsByPost[postId] = state.commentsByPost[postId].filter(
      //   (commentId) => commentId !== comment._id
      // );
      // delete state.commentsById[comment._id];
      // state.totalCommentsByPost[postId] -= 1;
    },
    editCommentSuccess: (state, action) => {
      state.isLoading = false;
      state.error = "";
    },
  },
});

export const createComment =
  ({ postId, content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", { content, postId });
      dispatch(slice.actions.createCommentSuccess(response.data));

      dispatch(getComments({ postId }));
      ///using this line will caught this=> when delete all the comments in page 2 of comment list it caught an error that not to show the comment list
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const deleteComment =
  ({ comment, postId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.delete(`/comments/${comment._id}`);
      dispatch(slice.actions.deleteCommentSuccess({ comment, postId }));
      dispatch(getComments({ postId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
export const editComment =
  ({ newContent, comment, postId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    console.log("commentchecking", comment);
    try {
      const respo = await apiService.put(`/comments/${comment._id}`, {
        content: newContent,
      });
      console.log("respo", respo);
      dispatch(slice.actions.editCommentSuccess({ comment, postId }));
      dispatch(getComments({ postId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const getComments =
  ({ postId, page = 1, limit = COMMENTS_PER_POST }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page: page,
        limit: limit,
      };
      const response = await apiService.get(`/posts/${postId}/comments`, {
        params,
      });

      dispatch(
        slice.actions.getCommentsSuccess({
          ...response.data,
          postId,
          page,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const sendCommentReaction =
  ({ commentId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Comment",
        targetId: commentId,
        emoji,
      });

      dispatch(
        slice.actions.sendCommentReactionSuccess({
          commentId,
          reactions: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
