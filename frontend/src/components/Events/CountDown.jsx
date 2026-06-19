import React, { useEffect, useState } from "react";

export const CountDown = ({ data }) => {
  
  const calculateTimeLeft = () => {
    const difference = +new Date(data) - +new Date();

    if (difference <= 0) return {};

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div
      key={interval}
      className="bg-gray-100 rounded-lg px-4 py-2 text-center min-w-[70px]"
    >
      <h3 className="font-bold text-[20px] text-[#333]">
        {timeLeft[interval]}
      </h3>
      <span className="text-[12px] text-gray-500 capitalize">
        {interval}
      </span>
    </div>
  ));

  return (
    <div className="mt-5">
      {timerComponents.length ? (
        <div className="flex gap-3 flex-wrap">
          {timerComponents}
        </div>
      ) : (
        <div className="text-red-500 font-semibold text-[18px]">
          Time's Up 🎉
        </div>
      )}
    </div>
  );
};