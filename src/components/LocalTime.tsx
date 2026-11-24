"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

function format() {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: profile.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/** Philippine local time. Rendered as a placeholder on the server, filled in on the client. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(format());
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className="tabular-nums" suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
