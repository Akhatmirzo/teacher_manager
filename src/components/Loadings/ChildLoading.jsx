import React from "react";
import { PacmanLoader } from "react-spinners";

export default function ChildLoading({ loading }) {
  return (
    loading && (
      <div className="w-full absolute top-0 left-0 h-full bg-[#dfdede]">
        <PacmanLoader
          color="green"
          size={50}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        />
      </div>
    )
  );
}
