const sortRanking = (array) => {
  array.sort((a, b) => {
    let comparison = 0;
    if (a.rank > b.rank) comparison = 1;
    else if (a.rank < b.rank) comparison = -1;
    return comparison;
  });
  return array;
};

export const rearrangeRanking = (result) => {
  let totalGameRanking = [];
  let totalPointRanking = [];
  let averagePointRanking = [];
  let averageOrderRanking = [];
  let winRateRanking = [];

  Object.keys(result).forEach((key) => {
    totalGameRanking.push({
      uid: key,
      value: result[key].total_game,
      rank: result[key].total_game_rank,
    });
    totalPointRanking.push({
      uid: key,
      value: result[key].total_point,
      rank: result[key].total_point_rank,
    });
    averagePointRanking.push({
      uid: key,
      value: result[key].average_point,
      rank: result[key].average_point_rank,
    });
    averageOrderRanking.push({
      uid: key,
      value: result[key].average_order,
      rank: result[key].average_order_rank,
    });
    winRateRanking.push({
      uid: key,
      value: result[key].win_rate,
      rank: result[key].win_rate_rank,
    });
  });
  let rankingList = {
    totalGameRanking: sortRanking(totalGameRanking),
    toalPointRanking: sortRanking(totalPointRanking),
    averagePointRanking: sortRanking(averagePointRanking),
    averageOrderRanking: sortRanking(averageOrderRanking),
    winRateRanking: sortRanking(winRateRanking),
  };

  return rankingList;
};
