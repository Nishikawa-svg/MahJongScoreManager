import React, { useContext } from "react";
import { CommunityContext } from "../contexts/CommunityContext";

const History = () => {
  const { history, users } = useContext(CommunityContext);
  return (
    <>
      <div>History</div>
      {history.map((item) => (
        <div key={item.created_at}>
          <div>{item.game_number}</div>
          <ul>
            <li>
              East : {users[item.east.uid].name}, {item.east.point},{" "}
              {item.east.score}
            </li>
            <li>
              South : {users[item.south.uid].name}, {item.south.point},{" "}
              {item.south.score}
            </li>
            <li>
              West : {users[item.west.uid].name}, {item.west.point},{" "}
              {item.west.score}
            </li>
            <li>
              North : {users[item.north.uid].name}, {item.north.point},{" "}
              {item.north.score}
            </li>
            scored by {item.scorer}
          </ul>
        </div>
      ))}
    </>
  );
};

export default History;
