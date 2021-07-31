import { useEffect, useState } from "react";

function BalanceTimerTest() {
  const [timeString, setTimeString] = useState("");
  const [timeHandle, setTimeHandle] = useState(null);

  function countDown() {
    const endTime = new Date(2021, 6, 15, 12, 0, 0, 0);
    const nowTime = new Date();
    const gapTime = endTime.getTime() - nowTime.getTime();
    if (gapTime === 0 && timeHandle) {
      clearInterval(timeHandle);
    }
    const day = Math.floor(gapTime / 1000 / 60 / 60 / 24);
    const hour = Math.floor((gapTime / 1000 / 60 / 60) % 24);
    const minute = Math.floor((gapTime / 1000 / 60) % 60);
    const second = Math.floor((gapTime / 1000) % 60);
    setTimeString(
      day +
        " days " +
        hour +
        " hours " +
        minute +
        " minutes " +
        second +
        " seconds"
    );
  }

  useEffect(() => {
    countDown();
    setTimeHandle(setInterval(countDown, 1000));
    return function cleanup() {
      if (timeHandle) {
        clearInterval(timeHandle);
      }
    };
  }, []);

  return (
    <>
      <h2>Balance</h2>
      <h2>Count Down</h2>
      <h1>Target: 2021-7-15 12:00:00</h1>
      <h3>{timeString}</h3>
    </>
  );
}

// export default Balance;
