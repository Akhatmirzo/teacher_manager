import React from "react";
import logo from "../../assets/Logo.png";

export default function Avatar({ src, size, title }) {
  return (
    <div
      style={{ width: size || "30px", height: size || "30px" }}
      className="border-2 rounded-full overflow-hidden"
    >
      <img
        src={src || logo}
        alt={title}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}
