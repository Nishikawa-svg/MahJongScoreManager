import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const getPointTransitionData = (rawData) => {
  let data = [{ gameNumber: "", point: 0 }];
  let sum = 0;
  rawData.forEach((item, index) => {
    sum += item.point;
    data.push({ gameNumber: index + 1, point: sum });
  });
  return data;
};

export const PointTransitionChart = ({ pointTransitionData }) => {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <LineChart
          data={getPointTransitionData(pointTransitionData)}
          margin={{ top: 16, right: 16, bottom: 15, left: -10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="gameNumber"
            // stroke="red"
            label={{
              value: "games",
              position: "insideBottom",
              dy: 15,
            }}
          />
          <YAxis
            label={{
              value: "point",
              angle: 270,
              position: "insideLeft",
              dx: 10,
              dy: 10,
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="point"
            //            stroke="#8884d8"
            stroke="#0000ff"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const getRankDetailDate = (rawData, chartOption) => {
  let total = [0, 0, 0, 0],
    east = [0, 0, 0, 0],
    south = [0, 0, 0, 0],
    west = [0, 0, 0, 0],
    north = [0, 0, 0, 0];
  Object.keys(rawData).forEach((key, index) => {
    if (key === "first") {
      total[0] += rawData[key].total;
      east[0] += rawData[key].east;
      south[0] += rawData[key].south;
      west[0] += rawData[key].west;
      north[0] += rawData[key].north;
    } else if (key === "second") {
      total[1] += rawData[key].total;
      east[1] += rawData[key].east;
      south[1] += rawData[key].south;
      west[1] += rawData[key].west;
      north[0] += rawData[key].north;
    } else if (key === "third") {
      total[2] += rawData[key].total;
      east[2] += rawData[key].east;
      south[2] += rawData[key].south;
      west[2] += rawData[key].west;
      north[2] += rawData[key].north;
    } else if (key === "fourth") {
      total[3] += rawData[key].total;
      east[3] += rawData[key].east;
      south[3] += rawData[key].south;
      west[3] += rawData[key].west;
      north[3] += rawData[key].north;
    }
  });
  let totalSum = 0;
  let eastSum = 0;
  let southSum = 0;
  let westSum = 0;
  let northSum = 0;
  for (let i = 0; i < 4; i++) {
    totalSum += total[i];
    eastSum += east[i];
    southSum += south[i];
    westSum += west[i];
    northSum += north[i];
  }
  let totalRatio = [0, 0, 0, 0];
  let eastRatio = [0, 0, 0, 0];
  let southRatio = [0, 0, 0, 0];
  let westRatio = [0, 0, 0, 0];
  let northRatio = [0, 0, 0, 0];
  for (let i = 0; i < 4; i++) {
    totalRatio[i] = Math.round((total[i] / totalSum) * 1000) / 10;
    eastRatio[i] = Math.round((east[i] / eastSum) * 1000) / 10;
    southRatio[i] = Math.round((south[i] / southSum) * 1000) / 10;
    westRatio[i] = Math.round((west[i] / westSum) * 1000) / 10;
    northRatio[i] = Math.round((north[i] / northSum) * 1000) / 10;
  }

  let isValid = true;
  let data;
  switch (chartOption.chartNumber) {
    case 0:
      if (totalSum === 0) isValid = false;
      else {
        if (chartOption.chartType === 0) data = total;
        else data = totalRatio;
      }
      break;
    case 1:
      if (eastSum === 0) isValid = false;
      else {
        if (chartOption.chartType === 0) data = east;
        else data = eastRatio;
      }
      break;
    case 2:
      if (southSum === 0) isValid = false;
      else {
        if (chartOption.chartType === 0) data = south;
        else data = southRatio;
      }
      break;
    case 3:
      if (westSum === 0) isValid = false;
      else {
        if (chartOption.chartType === 0) data = west;
        else data = westRatio;
      }
      break;
    case 4:
      if (northSum === 0) isValid = false;
      else {
        if (chartOption.chartType === 0) data = north;
        else data = northRatio;
      }
      break;
    default:
      isValid = false;
  }

  if (!isValid) return { isValid, data };
  else {
    return {
      isValid,
      data: [
        { name: "first", value: data[0] },
        { name: "second", value: data[1] },
        { name: "third", value: data[2] },
        { name: "fourth", value: data[3] },
      ],
    };
  }
};

const colors = ["#0088fe", "#00c49f", "#ffbb28", "#ff8042"];
export const RankDetailPieChart = ({ rankDetailData, chartOption }) => {
  const { isValid, data } = getRankDetailDate(rankDetailData, chartOption);
  if (isValid)
    return (
      <div style={{ width: "100%", height: 260, padding: 0 }}>
        <ResponsiveContainer style={{ padding: 0 }}>
          <PieChart style={{ padding: 0 }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              style={{ padding: 0 }}
              label
            >
              {data.map((item, index) => (
                <Cell
                  key={index}
                  stroke={"#fff"}
                  strokeWidth={1}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  else return <div style={{ height: 240 }}>nodata</div>;
};
