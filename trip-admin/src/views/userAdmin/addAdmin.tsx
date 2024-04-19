// 结合按钮和modal组件，实现添加管理员功能
import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { addAdmin } from "@/api/admin";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function AddAdmin({ onAdd }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      addAdmin(values).then((response) => {
        console.log(response);
        setVisible(false);
        form.resetFields();
        const newAdmin = {
          ...response.userInfo,
          _id: response.userInfo.userId,
        };
        onAdd(newAdmin);
      });
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        添加管理员
      </Button>
      <Modal
        title="添加管理员"
        open={visible}
        onOk={form.submit}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
