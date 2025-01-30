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
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-none">
        <h1>{goal?.title}</h1>
        <div
          style={{
            background: `linear-gradient(90deg, ${goal?.goalStyle?.colorFilled} ${percent}%, red ${percent}%)`,
            borderColor: goal?.goalStyle?.colorBorder,
          }}
          className={`w-96 border text-white flex justify-center`}
        >
          {goal?.collected || "0"} / {goal?.total}
        </div>
      </div>
    </div>
  );
}
