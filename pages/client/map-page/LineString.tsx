"use client";

import { useEffect, useRef, useState } from "react";

import { GeoJSON } from "react-leaflet";

import React from "react";

import { getLineString } from "@/features/client/map/get.LineString";

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

function LineString({ styleSettings }: Props) {
  const [data, setData] = useState<any>(null);

  const geoJsonRef = useRef<any>(null);

  useEffect(() => {
    getLineString().then(setData).catch(console.error);
  }, []);

  // UPDATE STYLE REALTIME
  useEffect(() => {
    if (!geoJsonRef.current) return;

    geoJsonRef.current.eachLayer((layer: any) => {
      layer.setStyle({
        color: "#E53935",

        weight: styleSettings.lineWeight,

        opacity: styleSettings.lineOpacity,
      });
    });
  }, [styleSettings]);

  if (!data) return null;

  return (
    <GeoJSON
      ref={geoJsonRef}
      data={data.data}
      style={{
        color: "#E53935",

        weight: styleSettings.lineWeight,

        opacity: styleSettings.lineOpacity,
      }}
    />
  );
}

export default React.memo(LineString);
