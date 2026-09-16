"use client";

import { useEffect, useState } from "react";

type MatchCountdownProps = {
  date: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(date: string): TimeLeft | null {
  const difference = new Date(date).getTime() - Date.now();

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

export function MatchCountdown({ date }: MatchCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft(date));
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [date]);

  if (!timeLeft) {
    return null;
  }

  return (
    <div className="mt-6 flex gap-6">
      <CountdownItem value={timeLeft.days} label="Dias" />
      <CountdownItem value={timeLeft.hours} label="Horas" />
      <CountdownItem value={timeLeft.minutes} label="Min" />
      <CountdownItem value={timeLeft.seconds} label="Seg" />
    </div>
  );
}

type CountdownItemProps = {
  value: number;
  label: string;
};

function CountdownItem({ value, label }: CountdownItemProps) {
  return (
    <div>
      <p className="text-2xl font-bold tabular-nums text-slate-900">
        {String(value).padStart(2, "0")}
      </p>

      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
  );
}