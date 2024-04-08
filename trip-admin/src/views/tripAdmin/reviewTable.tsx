import React, { useState, useEffect } from "react";
import { Table, Space, Button, notification } from "antd";
import { getTripsByStatus, Trip, passTrip, rejectTrip } from "@/api/trip";

const ReviewTable = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async (pageNum = 1, pageSize = 10) => {
    setLoading(true);
    getTripsByStatus({ status: "all", pageNum, pageSize })
      .then((response) => {
        setTrips(response.data);
        setTotal(response.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
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
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "作者",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "状态",
      dataIndex: "auditStatus",
      key: "auditStatus",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record, index) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handlePassTrip(record._id, index)}
          >
            审核通过
          </Button>
          <Button danger onClick={() => handleRejectTrip(record._id, index)}>
            拒绝
          </Button>
        </Space>
      ),
    },
  ];

  // 审核通过和拒绝的逻辑需要根据实际情况实现
  const handlePassTrip = (id, index) => {
    passTrip(id)
      .then(() => {
        notification.success({
          message: "Success",
          description: "审核通过",
        });
        // 修改状态
        const newTrips = [...trips];
        newTrips[index].auditStatus = "pass";
        setTrips(newTrips);
      })
      .catch((error) => {
        console.error("Error passing trip:", error);
      });
  };

  const handleRejectTrip = (id, index) => {
    rejectTrip(id)
      .then(() => {
        notification.success({
          message: "Success",
          description: "已拒绝",
        });
        // 修改状态
        const newTrips = [...trips];
        newTrips[index].auditStatus = "reject";
        setTrips(newTrips);
      })
      .catch((error) => {
        console.error("Error rejecting trip:", error);
      });
  };

  return (
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
      dataSource={trips}
    />
  );
};

export default ReviewTable;
