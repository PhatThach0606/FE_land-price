"use client";
import { useEffect, useMemo, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { getTraffic } from "@/features/client/map/get.Traffic";
import React from "react";

function Traffic() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    getTraffic()
      .then(setData)
      .catch((err) => console.error(err));
  }, []);
  const geoStyle = useMemo(
    () => ({
      weight: 2,
      fillColor: "orange",
      fillOpacity: 0.5,
    }),
    [],
  );
  return <>{data && <GeoJSON data={data} style={geoStyle} />}</>;
}

export default React.memo(Traffic);
