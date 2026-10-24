"use client";

import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

export function EventImage({
  src,
  title,
}: {
  src: string | null;
  title: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="event-image">
      {src && !failed ? (
        <Image
          src={src}
          alt={title}
          width={400}
          height={300}
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <CalendarDays size={48} strokeWidth={1.2} aria-hidden="true" />
      )}
    </div>
  );
}
