import { Modal } from "@mui/material";
import React, { useCallback } from "react";
import { Box, Card, alpha, Stack } from "@mui/material";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { editPost } from "./postSlice";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

function PostEdit({ openEditBox, setOpenEditBox, post }) {
  const { isLoading } = useSelector((state) => state.post);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: { ...post },
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, isDirty },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setOpenEditBox(false);
    dispatch(editPost(data)).then(() => reset());
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          "image",
          Object.assign(file, { preview: URL.createObjectURL(file) }),
          { shouldDirty: true }
        );
      }
    },
    [setValue]
  );

  const handleClose = () => setOpenEditBox(false);

  return (
    <Modal
      sx={{ top: "20%" }}
      keepMounted
      open={openEditBox}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Card sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FTextField
              name="content"
              multiline
              fullWidth
              rows={4}
              placeholder="Share what you are thinking here..."
              sx={{
                "& fieldset": {
                  borderWidth: `1px !important`,
                  borderColor: alpha("#919EAB", 0.32),
                },
              }}
            />
            {/* <FTextField name="image" placeholder="image" /> */}
            {/* <input type="file" ref={fileInput} onChange={handleFile} /> */}
            <FUploadImage
              name="image"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {isDirty ? (
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="small"
                  loading={isSubmitting || isLoading}
                >
                  Save Change
                </LoadingButton>
              ) : (
                <LoadingButton
                  variant="contained"
                  size="small"
                  type="button"
                  disabled
                >
                  Save Change
                </LoadingButton>
              )}
            </Box>
          </Stack>
        </FormProvider>
      </Card>
    </Modal>
  );
}

export default PostEdit;
