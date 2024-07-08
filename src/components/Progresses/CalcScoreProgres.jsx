/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "./CalcScoreStyle.css";

export default function CalcScoreProgres({ data }) {
  const [total, setTotal] = useState(0);

  const calcScore = () => {
    let bad = 0;
    let middle = 0;
    let good = 0;

    const score = data?.reduce((acc, lesson) => {
      if (lesson.score === 0) {
        bad++;
      } else if (lesson.score > 0 && lesson.score < 3) {
        middle++;
      } else if (lesson.score === 3) {
        good++;
      }
      return acc + lesson.score;
    }, 0);

    let examScore = 100;

    if (bad > 0) {
      examScore -= bad * 4;
    }

    if (middle > 0) {
      examScore -= middle * 3;
    }

    return examScore;
  };

  useEffect(() => {
    let examScore = 100;

    // eslint-disable-next-line no-unused-vars
    const score = data?.reduce((acc, lesson) => {
      if (lesson.score == 3) {
      } else if (lesson.score == 2 || lesson.score == 1) {
        examScore -= 3;
      } else if (lesson.score == 0) {
        examScore -= 4
      }
      return acc + lesson.score;
    }, 0);

    setTotal(examScore);
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <h2>Your Progress: {total}%</h2>
      <div className="wrap">
        <div className="progres" style={{ "--i": `${total}%` }}></div>
      </div>
    </div>
  );
}
