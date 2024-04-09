// 在React组件中
import { useEffect, useState } from "react";

const UserUpdate = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [travelogue, setTravelogue] = useState(null);

  useEffect(() => {
    const userId = "1"; // 根据实际情况设置
    const eventSource = new EventSource(
      `http://localhost:3000/api/event/user/${userId}`
    );

    eventSource.onmessage = (event) => {
      console.log(event.data);
      const data = JSON.parse(event.data);
      setTravelogue(data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      {/* <div>{travelogue && <div>最新旅游日记审核状态：{travelogue}</div>}</div> */}
    </>
  );
};

export default UserUpdate;
