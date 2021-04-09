import React, { useEffect } from "react";

const History = () => {
  useEffect(() => {
    console.log("History mounted");
    return () => {
      console.log("History unmounted");
    };
  }, []);
  return (
    <>
      <div>History</div>
    </>
  );
};

export default History;
