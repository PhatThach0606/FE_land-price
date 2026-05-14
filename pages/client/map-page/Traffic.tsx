"use client";
import { useEffect, useMemo, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { getTraffic } from "@/features/client/map/get.Traffic";
import { onEachFeature } from "@/components/MapClickHandler/MapClickHandler";
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
      color: "#F6C453",
      weight: 2.5,
      fillColor: "#F6C453",
      fillOpacity: 0.4,
    }),
    [],
  );
  return (
    <>
      {data && (
        <GeoJSON
          data={data.data}
          style={geoStyle}
          onEachFeature={onEachFeature}
        />
      )}
    </>
  );
}

export default React.memo(Traffic);
