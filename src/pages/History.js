import React, { useContext } from "react";
import { CommunityContext } from "../contexts/CommunityContext";

const History = () => {
  const { history } = useContext(CommunityContext);
  return (
    <>
      <div>History</div>
      {history.map((item) => (
        <div key={item.created_at}>
          <div>{item.game_number}</div>
          <ul>
            <li>
              East : {item.east.uid}, {item.east.point}
            </li>
            <li>
              South : {item.south.uid}, {item.south.point}
            </li>
            <li>
              West : {item.west.uid}, {item.west.point}
            </li>
            <li>
              North : {item.north.uid}, {item.north.point}
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default History;
