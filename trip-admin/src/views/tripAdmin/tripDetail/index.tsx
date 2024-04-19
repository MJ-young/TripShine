import { Modal, Button, List, Avatar, notification } from "antd";
import RejectTripModal from "./RejectTripModal";
import "swiper/css";
import "./index.scss";
import formatDate from "@/utils/formatDate";
import { passTrip } from "@/api/trip";
import { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const TripDetailModal = ({ isVisible, onClose, trip }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onRejectTrip = () => {
    setIsModalVisible(true);
  };
  const onPassTrip = () => {
    Modal.confirm({
      title: "确认通过这个行程吗？",
      onOk() {
        passTrip(trip._id)
          .then(() => {
            notification.success({
              message: "Success",
              description: "审核通过",
            });
            // 修改trip
            trip.auditStatus = "pass";
            onClose(true);
          })
          .catch((error) => {
            console.error("Error passing trip:", error);
          });
      },
    });
  };

  return (
    <>
      <Modal
        title={trip.title}
        open={isVisible}
        onCancel={onClose}
        footer={[
          <Button key="submit" type="primary" onClick={onPassTrip}>
            通过
          </Button>, // Add this line
          <Button key="reject" danger onClick={onRejectTrip}>
            拒绝
          </Button>, // Add this line
        ]}
      >
        <List>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={trip.avatar} size="large" />}
              title={trip.username}
              description={`发布时间：${formatDate(trip.createTime.$date)}`}
            />
          </List.Item>
          <List.Item>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {trip.images.map((image, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <img
                    src={image}
                    alt={`image-${index}`}
                    className="swiper-image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </List.Item>
          <List.Item>
            <div>{trip.content}</div>
          </List.Item>
        </List>
      </Modal>
      <RejectTripModal
        tripId={trip._id}
        visible={isModalVisible}
        onClose={(refresh) => {
          setIsModalVisible(false);
          if (refresh) {
            trip.auditStatus = "reject";
            onClose(true);
          }
        }}
      />
    </>
  );
};

export default TripDetailModal;
