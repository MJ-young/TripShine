import React from "react";
import { Modal, Form, Input, notification } from "antd";
import { rejectTrip } from "@/api/trip";

const RejectTripModal = ({ tripId, visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  // 使用onFinish来处理表单提交
  const handleFinish = (values) => {
    setLoading(true);
    const params = {
      id: tripId,
      rejectReason: values.reason,
    };
    rejectTrip(params)
      .then(() => {
        notification.success({
          message: "Success",
          description: "已拒绝",
        });
        form.resetFields(); // 重置表单项
        onClose(true);
      })
      .catch((error) => {
        console.error("Error rejecting trip:", error);
        notification.error({
          message: "Error",
          description: "拒绝操作失败",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      title="确认拒绝通过该旅行日记吗？"
      open={visible}
      onOk={() => form.submit()} // 使用form.submit触发表单提交
      confirmLoading={loading}
      onCancel={() => onClose(false)}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish} // 表单校验通过后的回调
      >
        <Form.Item
          name="reason"
          label="拒绝原因"
          rules={[{ required: true, message: "请输入拒绝原因！" }]}
        >
          <Input.TextArea rows={2} placeholder="请填写拒绝原因" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RejectTripModal;
