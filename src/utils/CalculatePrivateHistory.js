const directions = ["east", "south", "west", "north"];
export const calculatePrivateHistory = (
  privateHistory,
  gameRecode,
  game_id
) => {
  let newPrivateHistory = {};
  directions.forEach((direction) => {
    const ref = gameRecode[direction];
    let newElement;
    if (ref.uid in privateHistory) {
      console.log("exist");
      newElement = [...privateHistory[ref.uid].games];
    } else {
      newElement = [];
    }
    newElement.push({ game_id: game_id, point: ref.point });
    newPrivateHistory[ref.uid] = { games: newElement };
  });
  return newPrivateHistory;
};
