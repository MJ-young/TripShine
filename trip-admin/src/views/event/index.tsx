// TravelogueCounts.js
import { useEffect, useState } from "react";
import UserUpdate from "./userUpdate";
import useSSE from "@/utils/useSSE";

const EventPage = () => {
  const [counts, setCounts] = useState({
    waiting: 0,
    passed: 0,
    rejected: 0,
    total: 0,
  });

  useEffect(() => {
    const url = "/event/audit/count";

    // 调用useSSE并保存返回的清理函数
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cleanup = useSSE(url, {
      onOpen: (response) => {
        console.log("Connection opened", response);
      },
      onMessage: (event) => {
        console.log("Received message:", event.data);
        const data = JSON.parse(event.data);
        console.log(data);
        setCounts(data);
      },
      onError: (error) => {
        console.error("Error:", error);
      },
      onClose: () => {
        console.log("Connection closed");
      },
    });

    // useEffect的清理函数，用于在组件卸载时执行清理操作
    return cleanup;
  }, []);

  return (
    <div>
      <p>待审核: {counts.waiting}</p>
      <p>审核通过: {counts.passed}</p>
      <p>审核拒绝: {counts.rejected}</p>
      <p>总计: {counts.total}</p>
      <UserUpdate />
    </div>
  );
};

export default EventPage;
