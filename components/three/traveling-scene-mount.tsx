"use client";

import dynamic from "next/dynamic";

const TravelingScene = dynamic(() => import("./traveling-scene"), {
  ssr: false,
});

export function TravelingSceneMount() {
  return <TravelingScene />;
}
