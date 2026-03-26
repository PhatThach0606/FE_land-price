"use client";
import { useEffect, useMemo, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { getLineString } from "@/features/client/map/get.LineString";
import React from "react";

function LineString() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getLineString()
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  const geoStyle = useMemo(
    () => ({
      color: "red",
      weight: 2,
      fillColor: "green",
      fillOpacity: 0.5,
    }),
    [],
  );
  if (!data) return null;

  return <>{data && <GeoJSON data={data} style={geoStyle} />}</>;
}

export default React.memo(LineString);
  