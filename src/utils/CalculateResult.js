const makeNewResult = () => {
  return {
    total_game: 0,
    total_game_rank: 0,
    total_point: 0,
    total_point_rank: 0,
    average_point: 0,
    average_point_rank: 0,
    average_order: 0,
    average_order_rank: 0,
    win_rate: 0,
    win_rate_rank: 0,
    rank_detail: {
      first: {
        total: 0,
        east: 0,
        south: 0,
        west: 0,
        north: 0,
      },
      second: {
        total: 0,
        east: 0,
        south: 0,
        west: 0,
        north: 0,
      },
      third: {
        total: 0,
        east: 0,
        south: 0,
        west: 0,
        north: 0,
      },
      fourth: {
        total: 0,
        east: 0,
        south: 0,
        west: 0,
        north: 0,
      },
    },
  };
};
const copyResult = (el) => {
  const first_total = el.rank_detail.first.total;
  const first_east = el.rank_detail.first.east;
  const first_south = el.rank_detail.first.south;
  const first_west = el.rank_detail.first.west;
  const first_north = el.rank_detail.first.north;
  const second_total = el.rank_detail.second.total;
  const second_east = el.rank_detail.second.east;
  const second_south = el.rank_detail.second.south;
  const second_west = el.rank_detail.second.west;
  const second_north = el.rank_detail.second.north;
  const third_total = el.rank_detail.third.total;
  const third_east = el.rank_detail.third.east;
  const third_south = el.rank_detail.third.south;
  const third_west = el.rank_detail.third.west;
  const third_north = el.rank_detail.third.north;
  const fourth_total = el.rank_detail.fourth.total;
  const fourth_east = el.rank_detail.fourth.east;
  const fourth_south = el.rank_detail.fourth.south;
  const fourth_west = el.rank_detail.fourth.west;
  const fourth_north = el.rank_detail.fourth.north;
  return {
    total_game: el.total_game,
    total_game_rank: el.total_game_rank,
    total_point: el.total_point,
    total_point_rank: el.total_point_rank,
    average_point: el.average_point,
    average_point_rank: el.average_point_rank,
    average_order: el.average_order,
    average_order_rank: el.average_order_rank,
    win_rate: el.win_rate,
    win_rate_rank: el.win_rate_rank,
    rank_detail: {
      first: {
        total: first_total,
        east: first_east,
        south: first_south,
        west: first_west,
        north: first_north,
      },
      second: {
        total: second_total,
        east: second_east,
        south: second_south,
        west: second_west,
        north: second_north,
      },
      third: {
        total: third_total,
        east: third_east,
        south: third_south,
        west: third_west,
        north: third_north,
      },
      fourth: {
        total: fourth_total,
        east: fourth_east,
        south: fourth_south,
        west: fourth_west,
        north: fourth_north,
      },
    },
  };
};
const directions = ["east", "south", "west", "north"];
const createNewResult = (result, gameRecode) => {
  let newResult = {};
  Object.keys(result).forEach((key) => {
    newResult[key] = copyResult(result[key]);
  });
  directions.forEach((direction) => {
    if (gameRecode[direction].uid in result) {
    } else {
      newResult[gameRecode[direction].uid] = makeNewResult();
    }

    let ref = newResult[gameRecode[direction].uid];
    ref.total_game++;
    ref.total_point += gameRecode[direction].point;
    ref.average_point =
      Math.round((ref.total_point / ref.total_game) * 100) / 100;

    switch (gameRecode[direction].rank) {
      case 1:
        ref.rank_detail.first.total++;
        ref.rank_detail.first[direction]++;
        break;
      case 2:
        ref.rank_detail.second.total++;
        ref.rank_detail.second[direction]++;
        break;
      case 3:
        ref.rank_detail.third.total++;
        ref.rank_detail.third[direction]++;
        break;
      case 4:
        ref.rank_detail.fourth.total++;
        ref.rank_detail.fourth[direction]++;
        break;
      default:
        console.log("Error rank doesn't match");
    }

    let rankRef = ref.rank_detail;
    ref.average_order =
      Math.round(
        ((rankRef.first.total * 1 +
          rankRef.second.total * 2 +
          rankRef.third.total * 3 +
          rankRef.fourth.total * 4) /
          ref.total_game) *
          100
      ) / 100;
    ref.win_rate =
      Math.round(
        ((rankRef.first.total + rankRef.second.total) / ref.total_game) * 100
      ) / 100;
  });

  //calc win_rate and average_order
  let totalGameList = [],
    totalPointList = [],
    averageOrderList = [],
    averagePointList = [],
    winRateList = [];
  Object.keys(newResult).forEach((key) => {
    let personRef = newResult[key];
    totalGameList.push({ value: personRef.total_game, uid: key });
    totalPointList.push({ value: personRef.total_point, uid: key });
    averageOrderList.push({ value: personRef.average_order, uid: key });
    averagePointList.push({ value: personRef.average_point, uid: key });
    winRateList.push({ value: personRef.win_rate, uid: key });
  });

  //calc some rank
  let totalGameRankList = getSomeRank(totalGameList, true);
  let totalPointRankList = getSomeRank(totalPointList, true);
  let averageOrderRankList = getSomeRank(averageOrderList, false);
  let averagePointRankList = getSomeRank(averagePointList, true);
  let winRateRankList = getSomeRank(winRateList, true);
  totalGameRankList.forEach((item) => {
    let PersonRef = newResult[item.uid];
    PersonRef.total_game_rank = item.rank;
  });
  totalPointRankList.forEach((item) => {
    let PersonRef = newResult[item.uid];
    PersonRef.total_point_rank = item.rank;
  });
  averageOrderRankList.forEach((item) => {
    let PersonRef = newResult[item.uid];
    PersonRef.average_order_rank = item.rank;
  });
  averagePointRankList.forEach((item) => {
    let PersonRef = newResult[item.uid];
    PersonRef.average_point_rank = item.rank;
  });
  winRateRankList.forEach((item) => {
    let PersonRef = newResult[item.uid];
    PersonRef.win_rate_rank = item.rank;
  });

  //console.log(newResult);

  return newResult;
};

const getSomeRank = (list, greater) => {
  let rankList = list.map((item) => {
    return { uid: item.uid, rank: 1 };
  });
  if (greater) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (list[i].value > list[j].value) rankList[j].rank++;
        else if (list[i].value < list[j].value) rankList[i].rank++;
      }
    }
  } else {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (list[i].value > list[j].value) rankList[i].rank++;
        else if (list[i].value < list[j].value) rankList[j].rank++;
      }
    }
  }
  return rankList;
};

export const calculateResult = (result, gameRecode) => {
  //console.log(result, gameRecode);
  return createNewResult(result, gameRecode);
};
