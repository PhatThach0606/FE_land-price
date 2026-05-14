"use client";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import BenThanh from "./BenThanh";
import Traffic from "./Traffic";
import LineString from "./LineString";
import MapControlPanel from "@/components/MapControlPanel/MapControlPanel";

const baseMaps = {
  google: {
    url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    attribution: "© Google",
  },
  esri: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "© Esri",
  },
  voyager: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: "© CARTO",
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: "© CARTO",
  },
};

export default function Map() {
  const [baseMap, setBaseMap] = useState("google");
  const [layers, setLayers] = useState({
    benThanh: true,
    traffic: true,
    lineString: true,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative h-screen w-full z-1">
      <MapControlPanel
        baseMap={baseMap}
        setBaseMap={setBaseMap}
        layers={layers}
        toggleLayer={toggleLayer}
      />

      {/* MAP */}
      <MapContainer
        center={[10.77313, 106.69451]}
        zoom={16.5}
        minZoom={16}
        maxZoom={22}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          key={baseMap}
          url={baseMaps[baseMap as keyof typeof baseMaps].url}
          attribution={baseMaps[baseMap as keyof typeof baseMaps].attribution}
        />

        {layers.benThanh && <BenThanh />}
        {layers.traffic && <Traffic />}
        {layers.lineString && <LineString />}
      </MapContainer>
    </div>
  );
}
