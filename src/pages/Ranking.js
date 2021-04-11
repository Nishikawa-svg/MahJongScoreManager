import React, { useContext } from "react";
import { CommunityContext } from "../contexts/CommunityContext";

const Ranking = () => {
  const { users, rankings } = useContext(CommunityContext);
  return (
    <>
      <div>Ranking</div>
      <div>
        {Object.keys(rankings).map((key) => (
          <div key={key}>
            <div>{key.toString()}</div>
            <ul>
              {rankings[key].map((ranking) => (
                <li key={ranking.uid}>
                  {ranking.rank} : {users[ranking.uid].name}, {ranking.value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Ranking;
