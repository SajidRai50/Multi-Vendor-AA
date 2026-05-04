import React, { useEffect, useState } from "react";

export const CountDown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-05-17") - +new Date();

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
  }, []);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    return (
      <div
        key={interval}
        className="min-w-[70px] rounded-lg bg-[#f3f4ff] px-3 py-2 text-center shadow-sm"
      >
        <h4 className="text-[22px] font-bold text-[#3b28cc] leading-none">
          {timeLeft[interval]}
        </h4>
        <p className="text-[12px] capitalize text-gray-500 mt-1">{interval}</p>
      </div>
    );
  });

  return (
    <div className="mt-4">
      {timerComponents.length ? (
        <div className="flex flex-wrap items-center gap-3">
          {timerComponents}
        </div>
      ) : (
        <span className="inline-block rounded-lg bg-red-100 px-4 py-2 text-[16px] font-semibold text-red-600">
          Time's Up
        </span>
      )}
    </div>
  );
};
