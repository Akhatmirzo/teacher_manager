import React from "react";
import "./Style.css"

const CircleProgressBar = ({ progress, size = 100, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="circle-progress-bar"
    >
      <circle
        className="circle-background"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        fill="none"
      />
      <circle
        className="circle-progress"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="1.2em"
        fill="#000"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
      >
        {`${progress}`}
      </text>
    </svg>
  );
};

export default CircleProgressBar;
