import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import NavBar from "./components/NavBar";
import ImageUploader from "./components/ImageUploader";
import UniPopup from "./components/UniPopup";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  title: yup.string("Enter the title").required("Title is required"),
  content: yup.string("Enter the content").required("Content is required"),
  images: yup
    .array()
    .min(1, "At least one image is required")
    .required("Images are required"),
});

const CardPublish = ({ route }) => {
  const [showPopup, setShowPopup] = useState(true);
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      images: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handlePublish(values);
    },
  });

  useEffect(() => {
    const { title, content, images } = route.params || {};
    formik.setFieldValue("title", title || "");
    formik.setFieldValue("content", content || "");
    formik.setFieldValue("images", images || []);
  }, [route.params]);

  const handlePublish = async (values) => {
    console.log("Publishing:", values);
    // Implement publish logic here
  };

  const hidePopup = () => {
    setShowPopup(false);
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          Publish
        </Button>
      </form>
      <UniPopup show={showPopup} onHidePopup={hidePopup} />
    </Box>
  );
};

export default CardPublish;
