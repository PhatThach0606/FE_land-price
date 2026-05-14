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
      color: "#1A1A1B",
      weight: 3,
      opacity: 0.85,
    }),
    [],
  );
  if (!data) return null;

  return <>{data && <GeoJSON data={data.data} style={geoStyle} />}</>;
}

export default React.memo(LineString);
