"use client";

import { useEffect, useState } from "react";

export default function TimeBox() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-sm" suppressHydrationWarning>
      {currentDate.toString()}
    </span>
  );
}
