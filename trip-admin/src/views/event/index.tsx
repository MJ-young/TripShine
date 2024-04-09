// TravelogueCounts.js
import React, { useEffect, useState } from "react";
import UserUpdate from "./userUpdate";

const EventPage = () => {
  const [counts, setCounts] = useState({
    waiting: 0,
    passed: 0,
    rejected: 0,
    total: 0,
  });

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3000/api/event/audit/count"
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setCounts(data);
    };

    return () => {
      eventSource.close();
    };
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
