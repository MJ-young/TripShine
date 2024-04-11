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
import Container from "@mui/material/Container";

const validationSchema = yup.object({
  title: yup.string("输入标题").required("标题必须填写"),
  content: yup.string("输入内容").required("内容必须填写"),
  images: yup.array().min(1, "至少上传一张图片哦").required("图片是必须的"),
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
            // 清空表单
            formik.resetForm();
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
      initialValues.images.length !== currentValues.images.length || // 简单的数组长度比较，可能需要更复杂的逻辑
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          m: 1, // 垂直内边距
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="标题"
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
            label="内容"
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
            {isEdit ? "保存修改" : "创建游记"}
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
                删除
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"确认删除"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    确认删除此条旅行日记？该操作不可逆！
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleConfirmDelete} autoFocus color="error">
                    删除
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default CardPublish;
