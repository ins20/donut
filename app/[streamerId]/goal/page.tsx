"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export default function Widget({
  params,
}: {
  params: { streamerId: Id<"goals"> };
}) {
  const goal = useQuery(api.goals.getGoalById, {
    goalId: params.streamerId,
  });
  const percent =
    goal?.collected && goal?.total
      ? ((100 * goal?.collected) / goal?.total).toFixed()
      : 0;
  const isVertical = goal?.goalStyle?.direction;
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-none mx-auto">
        <h1>{goal?.title}</h1>
        <div
          style={{
            background: `linear-gradient(${isVertical ? "90deg" : "0deg"}, ${goal?.goalStyle?.colorFilled} ${percent}%, ${goal?.goalStyle?.backgroundColor} ${percent}%)`,
            borderColor: goal?.goalStyle?.colorBorder,
          }}
          className={`${isVertical ? "w-32 h-52 items-center" : "w-96"} border text-white flex justify-center`}
        >
          {goal?.collected || "0"} / {goal?.total}
        </div>
      </div>
    </div>
  );
}
