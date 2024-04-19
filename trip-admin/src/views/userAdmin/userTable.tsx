import { useState, useEffect } from "react";
import { Table, Space, Button, Modal, notification } from "antd";
import { getAdminList, Admin, resetPassword, deleteUser } from "@/api/admin";
import AddAdmin from "./addAdmin";

const UserTable = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async (pageNum = 1, pageSize = 10) => {
    setLoading(true);
    getAdminList({ pageNum, pageSize })
      .then((response) => {
        setAdmins(response.data);
        setTotal(response.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching admins:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTableChange = (page, pageSize) => {
    loadData(page, pageSize);
  };

  const columns = [
    {
      title: "管理员名称",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "管理员角色",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "操作",
      key: "action",
      render: (_, user, index) => (
        <Space size="middle">
          {/* 重置密码、删除 */}
          <Button type="primary" onClick={() => resetpsw(user)}>
            重置密码
          </Button>
          <Button danger onClick={() => delUser(user, index)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const resetpsw = (user: Admin) => {
    // 重置之前先确认
    Modal.confirm({
      title: `确认重置管理员 ${user.username} 的密码`,
      content: "重置后密码将改为adminadmin，确认重置吗？",
      onOk: () => {
        resetPassword(user._id)
          .then(() => {
            notification.success({
              message: "重置成功",
              description: `成功重置管理员 ${user.username} 的密码`,
            });
          })
          .catch((error) => {
            console.error("重置失败", error);
          });
      },
    });
  };

  const delUser = (user: Admin, index: number) => {
    // 删除之前先确认
    Modal.confirm({
      title: `确认删除管理员 ${user.username}`,
      content: "删除后无法恢复，确认删除吗？",
      onOk: () => {
        deleteUser(user._id)
          .then(() => {
            // 删除成功后，更新列表
            notification.success({
              message: "删除成功",
              description: `成功删除管理员${user.username}`,
            });
            const newAdmins = [...admins];
            newAdmins.splice(index, 1);
            setAdmins(newAdmins);
          })
          .catch((error) => {
            console.error("删除失败", error);
          });
      },
    });
  };

  return (
    <>
      <AddAdmin onAdd={(admin) => setAdmins([...admins, admin])} />
      <Table
        rowKey={"_id"}
        loading={loading}
        pagination={{
          total: total,
          pageSizeOptions: [1, 10, 15, 20],
          onChange: handleTableChange,
          showTotal: (total) => `共${total}条记录 `,
          defaultPageSize: 10,
          defaultCurrent: 1,
          position: ["bottomCenter"],
          // size: 'small',
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={admins}
      />
    </>
  );
};

export default UserTable;
