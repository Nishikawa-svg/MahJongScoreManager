const getRank = (scores, same_rank) => {
  let rank = [1, 1, 1, 1];
  if (same_rank) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (scores[i] < scores[j]) rank[i]++;
      }
    }
  } else {
    for (let i = 0; i < 4; i++) {
      for (let j = i + 1; j < 4; j++) {
        if (scores[i] < scores[j]) rank[i]++;
        else rank[j]++;
      }
    }
  }
  return rank;
};

const getPointTransaction = (rank, rankPoints) => {
  let rankDuplicate = [0, 0, 0, 0];
  for (let i = 0; i < 4; i++) {
    rankDuplicate[rank[i] - 1]++;
  }
  let pointTransaction = [0, 0, 0, 0];
  if (
    rankDuplicate[0] === 1 &&
    rankDuplicate[1] === 1 &&
    rankDuplicate[2] === 1 &&
    rankDuplicate[3] === 1
  ) {
    for (let i = 0; i < 4; i++) pointTransaction[i] = rankPoints[i];
  } else if (
    rankDuplicate[0] === 2 &&
    rankDuplicate[1] === 0 &&
    rankDuplicate[2] === 1 &&
    rankDuplicate[3] === 1
  ) {
    const amount = rankPoints[0] + rankPoints[1];
    pointTransaction[0] = amount - Math.floor(amount / 2);
    pointTransaction[1] = Math.floor(amount / 2);
    pointTransaction[2] = rankPoints[2];
    pointTransaction[3] = rankPoints[3];
  } else if (
    rankDuplicate[0] === 1 &&
    rankDuplicate[1] === 2 &&
    rankDuplicate[2] === 0 &&
    rankDuplicate[3] === 1
  ) {
    const amount = rankPoints[1] + rankPoints[2];
    pointTransaction[0] = rankPoints[0];
    pointTransaction[1] = amount - Math.floor(amount / 2);
    pointTransaction[2] = Math.floor(amount / 2);
    pointTransaction[3] = rankPoints[3];
  } else if (
    rankDuplicate[0] === 1 &&
    rankDuplicate[1] === 1 &&
    rankDuplicate[2] === 2 &&
    rankDuplicate[3] === 0
  ) {
    const amount = rankPoints[2] + rankPoints[3];
    pointTransaction[0] = rankPoints[0];
    pointTransaction[1] = rankPoints[1];
    pointTransaction[2] = amount - Math.floor(amount / 2);
    pointTransaction[3] = Math.floor(amount / 2);
  } else if (
    rankDuplicate[0] === 3 &&
    rankDuplicate[1] === 0 &&
    rankDuplicate[2] === 0 &&
    rankDuplicate[3] === 1
  ) {
    const amount = rankPoints[0] + rankPoints[1] + rankPoints[2];
    pointTransaction[0] = amount - Math.floor(amount / 3) * 2;
    pointTransaction[1] = Math.floor(amount / 3);
    pointTransaction[2] = Math.floor(amount / 3);
    pointTransaction[3] = rankPoints[3];
  } else if (
    rankDuplicate[0] === 1 &&
    rankDuplicate[1] === 3 &&
    rankDuplicate[2] === 0 &&
    rankDuplicate[3] === 0
  ) {
    const amount = rankPoints[1] + rankPoints[2] + rankPoints[3];
    pointTransaction[0] = rankPoints[0];
    pointTransaction[1] = amount - Math.floor(amount / 3) * 2;
    pointTransaction[2] = Math.floor(amount / 3);
    pointTransaction[3] = Math.floor(amount / 3);
  } else if (
    rankDuplicate[0] === 4 &&
    rankDuplicate[1] === 0 &&
    rankDuplicate[2] === 0 &&
    rankDuplicate[3] === 0
  ) {
    const amount =
      rankPoints[0] + rankPoints[1] + rankPoints[2] + rankPoints[3];
    pointTransaction[0] = amount - Math.floor(amount / 4) * 3;
    pointTransaction[1] = Math.floor(amount / 4);
    pointTransaction[2] = Math.floor(amount / 4);
    pointTransaction[3] = Math.floor(amount / 4);
  } else {
    console.log(
      "Error : at getPointTransaction ",
      rank,
      rankPoints,
      rankDuplicate
    );
  }

  return pointTransaction;
};

export const calculatePoints = (players, scores, rules, scorer) => {
  console.log("calculate points", players, scores, rules, scorer);

  //error check
  let valid = true;
  let errorMessage = "nothing wrong";
  let points = [0, 0, 0, 0];
  let totalScore = 0;
  for (let i = 0; i < 4; i++) {
    if (players[i] === "") {
      valid = false;
      errorMessage = "please select all players";
      return { valid, errorMessage };
    }
    if (scores[i] === "") {
      valid = false;
      errorMessage = "please enter all player's score";
      return { valid, errorMessage };
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      if (players[i] === players[j]) {
        valid = false;
        errorMessage = "players are duplicated";
        return { valid, errorMessage };
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    if (isNaN(parseInt(scores[i]))) {
      valid = false;
      errorMessage = "score value is not a number";
      return { valid, errorMessage };
    }
    if (parseInt(scores[i]) !== Number(scores[i])) {
      valid = false;
      errorMessage = "score must be an integer";
      return { valid, errorMessage };
    }
    points[i] = parseInt(scores[i]);
    totalScore += points[i];
  }
  if (totalScore !== rules.score_start * 4) {
    valid = false;
    errorMessage = `all player's score sum must be ${rules.score_start * 4}`;
    return { valid, errorMessage };
  }
  //end of error check

  //get ranking
  const rank = getRank([...points], rules.same_rank);
  const rankOrderByDerection = getRank([...points], false);
  console.log(rank);
  //end of get ranking

  //edge of score calculation
  for (let i = 0; i < 4; i++) {
    switch (rules.score_edge_calc) {
      case 0:
        points[i] = Math.floor(points[i] / 1000);
        break;
      case 1:
        points[i] = Math.ceil(points[i] / 1000);
        break;
      case 2:
        points[i] = Math.round(points[i] / 1000);
        break;
      case 3:
        points[i] = Math.round((points[i] - 100) / 1000);
        break;
      case 4:
        if (points[i] >= rules.score_base) {
          points[i] = Math.floor(points[i] / 1000);
        } else {
          points[i] = Math.ceil(points[i] / 1000);
        }
        break;
      case 5:
        points[i] = points[i] / 1000;
        break;
      default:
        console.log("Error : invalid option at rules.socre_edge_calc");
    }
  }
  console.log("after edge calc point", points);
  //end of edge of score calculation

  //calc plane points
  //25000 - 30000
  for (let i = 0; i < 4; i++) {
    points[i] -= Math.round(rules.score_base / 1000);
  }
  console.log("plane point", points);
  //end of clac plane points

  //add rank point (uma)
  if (rules.uma) {
    let rankPoints;
    switch (rules.uma) {
      case 0:
        rankPoints = [0, 0, 0, 0];
        break;
      case 1:
        rankPoints = [10, 5, -5, -10];
        break;
      case 2:
        rankPoints = [20, 10, -10, -20];
        break;
      case 3:
        rankPoints = [30, 10, -10, -30];
        break;
      case 4:
        rankPoints = Object.keys(rules.uma_points_customize).map(
          (key) => rules.uma_points_customize[key]
        );
        break;
      default:
        console.log("Error : invalid option at rules.uma");
    }

    if (rules.top_award) {
      rankPoints[0] += Math.round(
        ((rules.score_base - rules.score_start) * 4) / 1000
      );
    }
    console.log("rank points", rankPoints);

    const pointTransaction = getPointTransaction(rank, rankPoints);
    console.log("point transaction", pointTransaction);

    for (let i = 0; i < 4; i++) {
      points[i] += pointTransaction[rankOrderByDerection[i] - 1];
    }
  }
  //end of add rank point (uma)

  //top adjustment
  if (rules.top_adjustment) {
    let sum = 0;
    let first;
    for (let i = 0; i < 4; i++) {
      if (rankOrderByDerection[i] !== 1) sum += points[i];
      else first = i;
    }
    points[first] = -sum;
  }
  //end of top adjustment

  const newGameRecode = {
    scorer: scorer,
    east: {
      point: points[0],
      score: parseInt(scores[0]),
      rank: rank[0],
      uid: players[0],
    },
    south: {
      point: points[1],
      score: parseInt(scores[1]),
      rank: rank[1],
      uid: players[1],
    },
    west: {
      point: points[2],
      score: parseInt(scores[2]),
      rank: rank[2],
      uid: players[2],
    },
    north: {
      point: points[3],
      score: parseInt(scores[3]),
      rank: rank[3],
      uid: players[3],
    },
  };

  console.log(newGameRecode);
  console.log(points);
  return { valid, errorMessage, newGameRecode };
};
