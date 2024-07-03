import React from "react";
import notfoundimg from "../../assets/notfound.svg";

export default function NotFound() {
  return (
    <div className="w-[calc(100vw_-_98px)] h-screen relative sm:w-[calc(100vw_-_50px)]">
        <div className="w-full h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center justify-center">
          <img
            src={notfoundimg}
            alt=""
            className="w-1/2 h-1/2 z-[1000] lg:w-10/12"
          />
          <h1 className="text-[20px] font-semibold z-[1000] md:text-[16px]">
            Page Not Found
          </h1>
          <h2 className="text-[300px] absolute top-[0] opacity-[0.1] -z-[999] md:text-[180px] md:top-[10%] sm:text-[100px]">
            404
          </h2>
        </div>
    </div>
  );
}
