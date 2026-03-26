"use client";
import { useEffect, useMemo, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { getMap } from "@/features/client/map/get.BenThanh";
import React from "react";
import { onEachFeature } from "@/components/MapClickHandler/MapClickHandler";
function BenThanh() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    getMap()
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  const geoStyle = useMemo(
    () => ({
      color: "black",
      weight: 2,
      fillColor: "green",
      fillOpacity: 0.5,
    }),
    [],
  );

  if (!data) return null;

  return (
    <>
      {data && (
        <GeoJSON data={data} style={geoStyle} onEachFeature={onEachFeature} />
      )}
    </>
  );
}

export default React.memo(BenThanh);
