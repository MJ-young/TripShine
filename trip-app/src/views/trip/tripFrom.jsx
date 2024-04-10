import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Dialog } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { createTrip, updateTrip, deleteTrip } from "@/api/trip";
import ImageUploader from "@/components/ImageUploader";
import { useNavigation } from "@react-navigation/native";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const validationSchema = yup.object({
  title: yup.string("Enter the title").required("Title is required"),
  content: yup.string("Enter the content").required("Content is required"),
  images: yup
    .array()
    .min(1, "At least one image is required")
    .required("Images are required"),
});

const CardPublish = ({ route }) => {
  const isEdit = route.params?._id;
  const [isFormChanged, setIsFormChanged] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      title: route.params?.title || "",
      content: route.params?.content || "",
      images: route.params?.images || [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isEdit) {
        console.log("Updating:", values, route.params);
        // 在values中添加 _id 字段
        values._id = route.params._id;
        updateTrip(values)
          .then(() => {
            // 出栈，返回上一页
            navigation.pop();
          })
          .catch((error) => {
            console.error("Error updating:", error);
          });
      } else {
        createTrip(values)
          .then(() => {
            // 返回home页
            navigation.navigate("Home");
          })
          .catch((error) => {
            console.error("Error creating:", error);
          });
      }
    },
  });

  // 监控表单值的变化
  useEffect(() => {
    const initialValues = formik.initialValues;
    const currentValues = formik.values;

    const isChanged =
      initialValues.title !== currentValues.title ||
      initialValues.content !== currentValues.content ||
      // initialValues.images.length !== currentValues.images.length; // 简单的数组长度比较，可能需要更复杂的逻辑
      initialValues.images.some(
        (img, index) => img !== currentValues.images[index]
      ); // 比较数组中的每个元素

    setIsFormChanged(isChanged);
  }, [formik.values]); // 依赖于 formik.values 的变化

  const [open, setOpen] = useState(false);

  const showDeleteDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    setOpen(false);
    deleteTrip(route.params._id)
      .then(() => {
        navigation.pop();
        handleClose();
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
  };

  return (
    <Box sx={{ width: "85%", padding: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          margin="normal"
        />
        <TextField
          fullWidth
          id="content"
          name="content"
          label="Content"
          multiline
          rows={4}
          value={formik.values.content}
          onChange={formik.handleChange}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
          margin="normal"
        />
        <ImageUploader
          images={formik.values.images}
          setImages={(images) => formik.setFieldValue("images", images)}
        />
        <Button
          sx={{ margin: 1 }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={!isFormChanged} // 按钮启用状态取决于表单是否更改
        >
          {isEdit ? "Save Changes" : "Publish"}
        </Button>
        {/* 如果当前为编辑页，添加删除按钮 */}
        {isEdit && (
          <>
            <Button
              sx={{ margin: 1 }}
              variant="outlined"
              color="error"
              onClick={showDeleteDialog}
              fullWidth
            >
              Delete
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm Delete"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirmDelete} autoFocus color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </form>
    </Box>
  );
};

export default CardPublish;
