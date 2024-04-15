import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Modal,
  Text,
} from "react-native";
import {
  Button,
  Portal,
  Dialog,
  Paragraph,
  TextInput as PaperTextInput,
} from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import { createTrip, updateTrip, deleteTrip } from "@/api/trip";
import ImageUploader from "@/components/ImageUploader"; // Make sure this component is adapted to React Native
import { useNavigation } from "@react-navigation/native";

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
      const action = isEdit ? updateTrip : createTrip;
      // 如果是编辑状态，需要传入_id
      if (isEdit) {
        values._id = route.params._id;
      }
      action(values)
        .then(() => {
          formik.resetForm();
          navigation.goBack();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  useEffect(() => {
    setIsFormChanged(formik.dirty);
  }, [formik.values]);

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleConfirmDelete = () => {
    deleteTrip(route.params._id)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
    hideDialog();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <PaperTextInput
          mode="outlined"
          label="标题"
          value={formik.values.title}
          onChangeText={formik.handleChange("title")}
          error={formik.touched.title && Boolean(formik.errors.title)}
          style={styles.input}
        />
        <PaperTextInput
          mode="outlined"
          label="内容"
          value={formik.values.content}
          onChangeText={formik.handleChange("content")}
          error={formik.touched.content && Boolean(formik.errors.content)}
          multiline
          numberOfLines={4}
          style={styles.input}
        />
        <View style={{ marginBottom: 16 }}>
          <ImageUploader
            images={formik.values.images}
            setImages={(images) => formik.setFieldValue("images", images)}
          />
        </View>
        <Button
          mode="contained"
          onPress={formik.handleSubmit}
          disabled={!isFormChanged}
          style={styles.button}
        >
          {isEdit ? "保存修改" : "创建游记"}
        </Button>
        {isEdit && (
          <Button mode="outlined" onPress={showDialog} style={styles.button}>
            删除
          </Button>
        )}
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>确认删除</Dialog.Title>
          <Dialog.Content>
            <Paragraph>确认删除此条旅行日记？该操作不可逆！</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>取消</Button>
            <Button onPress={handleConfirmDelete} color="red">
              删除
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    flex: 1,
    justifyContent: "space-between",
  },
  button: {
    marginVertical: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: "white",
    marginBottom: 16,
  },
});

export default CardPublish;
