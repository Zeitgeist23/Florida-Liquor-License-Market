"use client";

import { useMemo } from "react";

type Props = {
  firstSeenAt: string;
  removedAt?: string | null;
  status?: string;
};

function dayDifference(start: string, end: Date) {
  const startDate = new Date(start);
  if (Number.isNaN(startDate.getTime())) return null;
  const diff = end.getTime() - startDate.getTime();
  return Math.max(0, Math.floor(diff / 86_400_000));
}

export default function ObservedDaysOnMarket({
  firstSeenAt,
  removedAt,
  status = "active",
}: Props) {
  const days = useMemo(() => {
    const end = removedAt ? new Date(removedAt) : new Date();
    if (Number.isNaN(end.getTime())) return null;
    return dayDifference(firstSeenAt, end);
  }, [firstSeenAt, removedAt]);

  if (days === null) return <>Not available</>;

  return (
    <>
      {days} {days === 1 ? "day" : "days"}
      {status !== "active" ? " observed" : ""}
    </>
  );
}
