import React from "react";
import StatisticLine from "./StatisticLine";

const Statistic = ({good, bad, neutral}) => {
    const total=good+neutral+bad;
    const average=good>0||bad>0 ? (good-bad)/total : 0;
    const positive=good>0 ? good*100/total : 0;
    if (good === 0 && bad===0 && neutral===0) {
      return (
        <p>No feedback given</p>
      )
    }
    return (
      <div>
      <table>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={total} />
        <StatisticLine text={"average"} value={average} />
        <StatisticLine text={"positive"} value={`${positive}%`} />
        </table>
      </div>
    )
  };

  export default Statistic;