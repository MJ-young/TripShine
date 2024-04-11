import moment from "moment";

// 格式化日期
const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

export default formatDate;
