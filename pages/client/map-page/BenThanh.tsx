"use client";

import { useEffect, useRef, useState } from "react";

import { GeoJSON } from "react-leaflet";

import React from "react";

import { getMap } from "@/features/client/map/get.BenThanh";

import { landStyle, roadStyle } from "@/components/map/utils/mapStyle";

import { onEachFeature } from "@/components/MapClickHandler/MapClickHandler";

type Props = {
  styleSettings: any;
};

function BenThanh({ styleSettings }: Props) {
  const [data, setData] = useState<any>(null);

  const geoJsonRef = useRef<any>(null);

  useEffect(() => {
    getMap().then(setData).catch(console.error);
  }, []);

  // UPDATE STYLE REALTIME
  useEffect(() => {
    if (!geoJsonRef.current) return;

    geoJsonRef.current.eachLayer((layer: any) => {
      const feature = layer.feature;

      const type = feature?.properties?.type;

      const loaiDat = feature?.properties?.loai_dat;

      if (type === "road") {
        layer.setStyle(roadStyle.default(loaiDat, styleSettings));
      } else {
        layer.setStyle(landStyle.default(loaiDat, styleSettings));
      }
    });
  }, [styleSettings]);

  if (!data) return null;

  return (
    <GeoJSON
      ref={geoJsonRef}
      data={data.data}
      onEachFeature={onEachFeature(styleSettings)}
    />
  );
}

export default React.memo(BenThanh);
