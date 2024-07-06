import React, { useEffect, useState } from "react";
import { calculateLevel } from "../../utils/CalcLevel";

export default function LevelBadge({ score }) {
  const color = ["#f8312f", "#ff6b6b", "#399af5", "#45a049", "#f39c12"];
  const level = ["qo'y", "idiot", "junior", "middle", "senior"];

  const [calcScore, setCalcScore] = useState();

  useEffect(() => {
    const value = calculateLevel(score)
    setCalcScore(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`flex items-center rounded-full py-1 px-4 font-medium border text-green-900 border-green-300`}
      style={{ backgroundColor: color[calcScore]}}
    >
      {level[calcScore]}
    </div>
  );
}
