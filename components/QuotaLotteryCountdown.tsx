"use client";

import { useEffect, useState } from "react";

const DEADLINE = new Date("2026-09-30T17:00:00-04:00").getTime();

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  closed: boolean;
};

function getTimeRemaining(): TimeRemaining {
  const difference = Math.max(0, DEADLINE - Date.now());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference % 86_400_000) / 3_600_000),
    minutes: Math.floor((difference % 3_600_000) / 60_000),
    seconds: Math.floor((difference % 60_000) / 1_000),
    closed: difference === 0,
  };
}

function formatUnit(value: number) {
  return String(value).padStart(2, "0");
}

export default function QuotaLotteryCountdown() {
  const [remaining, setRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const update = () => {
      const next = getTimeRemaining();
      setRemaining((current) => {
        if (
          current
          && current.days === next.days
          && current.hours === next.hours
          && current.minutes === next.minutes
          && current.seconds === next.seconds
          && current.closed === next.closed
        ) {
          return current;
        }
        return next;
      });
    };
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="quota-countdown" aria-label="Time remaining to enter the 2026 quota drawing">
      <div className="quota-countdown-heading">
        <i aria-hidden="true" />
        <div>
          <strong>Time left to enter</strong>
          <span>Closes September 30 at 5:00 p.m. ET</span>
        </div>
      </div>
      {remaining?.closed ? (
        <strong className="quota-countdown-closed">Entry period closed</strong>
      ) : (
        <div className="quota-countdown-units">
          <span><strong>{remaining ? formatUnit(remaining.days) : "--"}</strong><small>Days</small></span>
          <span><strong>{remaining ? formatUnit(remaining.hours) : "--"}</strong><small>Hours</small></span>
          <span><strong>{remaining ? formatUnit(remaining.minutes) : "--"}</strong><small>Minutes</small></span>
          <span><strong>{remaining ? formatUnit(remaining.seconds) : "--"}</strong><small>Seconds</small></span>
        </div>
      )}
    </section>
  );
}
