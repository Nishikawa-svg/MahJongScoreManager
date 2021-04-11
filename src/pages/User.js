import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CommunityContext } from "../contexts/CommunityContext";
import { Link } from "react-router-dom";

const User = () => {
  const { users, result } = useContext(CommunityContext);
  const { uid } = useParams();

  if (result[uid] && users[uid]) {
    const ref = result[uid];
    const privateItems = (
      <ul>
        <li>
          total game : {ref.total_game}, rank : {ref.total_game_rank}
        </li>
        <li>
          total point : {ref.total_point}, rank : {ref.total_point_rank}
        </li>
        <li>
          average point : {ref.average_point}, rank : {ref.average_point_rank}
        </li>
        <li>
          avarage order : {ref.average_order}, rank : {ref.average_order_rank}
        </li>
        <li>
          win rate : {ref.win_rate}, rank : {ref.win_rate_rank}
        </li>
      </ul>
    );
    return (
      <>
        <Link to="/users">back to users page</Link>
        <div>User</div>
        <div>uid : {uid}</div>
        <div>{users[uid].name}'s page</div>
        <div>{privateItems}</div>
      </>
    );
  } else
    return (
      <>
        <Link to="/users">back to users page</Link>
        <div>User</div>
        <div>uid : {uid}</div>
        <div>{users[uid].name}'s page</div>
        <div>no data</div>
      </>
    );
};

export default User;
