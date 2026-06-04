"use client";

import { useEffect, useRef, useState } from "react";

import { GeoJSON } from "react-leaflet";

import React from "react";

import { getTrafficLogic } from "@/features/client/map/get.Traffic";

import { roadStyle } from "@/components/map/utils/mapStyle";

import { onEachFeature } from "@/components/MapClickHandler/MapClickHandler";

type Props = {
  styleSettings: {
    landFillOpacity: number;
    landWeight: number;

    roadFillOpacity: number;
    roadWeight: number;

    lineOpacity: number;
    lineWeight: number;
  };
};

function TrafficLogic({ styleSettings }: Props) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getTrafficLogic().then(setData).catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <GeoJSON
      data={data.data}
      style={{
        opacity: 0,
        fillOpacity: 0,
        weight: 10, // 🔥 vùng click
      }}
      onEachFeature={onEachFeature(styleSettings)}
    />
  );
}

export default React.memo(TrafficLogic);
