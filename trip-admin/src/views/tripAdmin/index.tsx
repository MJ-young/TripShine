import { useState, useEffect } from "react";
import { Table, Space, Button, notification, Modal, Tag } from "antd";
import { getTripsByStatus, Trip, deleteTrip } from "@/api/trip";
import TripDetailModal from "./tripDetail";
import formatDate from "@/utils/formatDate";
import Cookies from "js-cookie";

const TripAdmin = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const userRole = Cookies.get("adminRole");

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
  const handleViewDetails = (record: Trip) => {
    setSelectedTrip(record);
    setIsModalVisible(true);
  };
  const auditStatusMap = {
    pass: {
      color: "success",
      text: "通过",
    },
    wait: {
      color: "processing",
      text: "等待审核",
    },
    reject: {
      color: "error",
      text: "拒绝",
    },
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
      render: (_text, record) => formatDate(record.createTime.$date),
    },
    {
      title: "状态",
      dataIndex: "auditStatus",
      key: "auditStatus",
      render: (text) => {
        // 根据auditStatus获取对应的颜色和显示文本
        const { color, text: statusText } = auditStatusMap[text] || {};
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_, record, index) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleViewDetails(record)}>
            查看详情
          </Button>
          {userRole === "super" && (
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(record._id, index)}
            >
              删除
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleDelete = (id: string, index: number) => {
    Modal.confirm({
      title: "确认删除这个行程吗？",
      onOk() {
        deleteTrip(id)
          .then(() => {
            notification.success({
              message: "Success",
              description: "删除成功",
            });
            setTrips((prev) => {
              const newTrips = [...prev];
              newTrips.splice(index, 1);
              return newTrips;
            });
          })
          .catch((error) => {
            console.error("Error deleting trip:", error);
          });
      },
    });
  };

  return (
    <>
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
      {selectedTrip && (
        <TripDetailModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          trip={selectedTrip}
        />
      )}
    </>
  );
};

export default TripAdmin;
