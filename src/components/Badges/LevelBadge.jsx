import React, { useEffect, useState } from "react";

export default function LevelBadge({ score }) {
  const color = ["#f8312f", "#ff6b6b", "#399af5", "#45a049", "#f39c12"];
  const level = ["qo'y", "idiot", "junior", "middle", "senior"];

  const [calcScore, setCalcScore] = useState();

  const calculateLevel = () => {
    if (score <= 8) {
      setCalcScore(0);
    }

    if (score > 8 && score < 15) {
      setCalcScore(1);
    }

    if (score >= 15 && score < 18) {
      setCalcScore(2);
    }

    if (score >= 18 && score <= 20) {
      setCalcScore(3);
    }

    if (score > 20) {
      setCalcScore(4);
    }
  };

  useEffect(() => {
    calculateLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`flex items-center rounded-full py-1 px-4 font-medium border text-green-900 bg-['${color[calcScore]}'] border-green-300`}
    >
      {level[calcScore]}
    </div>
  );
}
