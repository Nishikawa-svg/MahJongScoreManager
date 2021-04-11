import React, { useContext, useState, useEffect } from "react";
import { CommunityContext } from "../contexts/CommunityContext";
import { rearrangeRanking } from "../utils/RearrangeRanking";

const Ranking = () => {
  const { result, users } = useContext(CommunityContext);
  const [rankings, setRankings] = useState([]);
  useEffect(() => {
    setRankings(rearrangeRanking(result));
  }, [result]);
  console.log(rankings);
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
