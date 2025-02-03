"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Widget({
  params,
}: {
  params: { streamerId: Id<"users"> };
}) {
  const latestDonation = useQuery(api.donations.getLatestForStreamer, {
    streamerId: params.streamerId,
  });
  const [showDonation, setShowDonation] = useState(false);

  useEffect(() => {
    if (latestDonation) {
      console.log(latestDonation.goal);
      setShowDonation(true);
      const timer = setTimeout(() => {
        setShowDonation(false);
      }, latestDonation.goal?.alertStyle?.duration);
      return () => clearTimeout(timer);
    }
  }, [latestDonation]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {!showDonation || !latestDonation ? (
        <></>
      ) : (
        <div className="flex flex-col gap-6 items-center justify-center">
          {latestDonation.goal?.alertStyle?.image && (
            <Image
              alt={latestDonation.goal?.title || ""}
              width={200}
              src={latestDonation.goal?.alertStyle?.image}
            />
          )}

          <div
            style={{
              color: latestDonation.goal?.alertStyle?.textColor,
              backgroundColor: latestDonation.goal?.alertStyle?.backgroundColor,
              fontSize: latestDonation.goal?.alertStyle?.fontSize + "px",
            }}
            className="p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center">
              <h2>{latestDonation.name}-</h2>
              <p>₽{latestDonation.amount.toFixed(2)}</p>
            </div>
            <p>{latestDonation.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
