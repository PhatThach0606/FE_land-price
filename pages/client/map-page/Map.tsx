"use client";
import { useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import BenThanh from "./BenThanh";
import Traffic from "./Traffic";
import TrafficLogic from "./Traffic_Logic";
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
    trafficLogic: true,
    lineString: true,
  });

  const [styleSettings, setStyleSettings] = useState({
    landFillOpacity: 1,
    landWeight: 0.5,
    roadFillOpacity: 1,
    roadWeight: 1.5,
    lineOpacity: 1,
    lineWeight: 3,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const currentBaseMap = useMemo(
    () => baseMaps[baseMap as keyof typeof baseMaps],
    [baseMap],
  );

  return (
    <div className="relative h-[calc(100vh-80px)] w-full z-1">
      <MapControlPanel
        baseMap={baseMap}
        setBaseMap={setBaseMap}
        layers={layers}
        toggleLayer={toggleLayer}
        styleSettings={styleSettings}
        setStyleSettings={setStyleSettings}
      />

      <MapContainer
        center={[10.77313, 106.69451]}
        zoom={16}
        minZoom={16}
        maxZoom={22}
        preferCanvas={true}
        zoomControl={false}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          key={baseMap}
          url={currentBaseMap.url}
          attribution={currentBaseMap.attribution}
        />

        {layers.benThanh && <BenThanh styleSettings={styleSettings} />}
        {layers.trafficLogic && <Traffic styleSettings={styleSettings} />}
        {layers.trafficLogic && <TrafficLogic styleSettings={styleSettings} />}
        {layers.lineString && <LineString styleSettings={styleSettings} />}
      </MapContainer>
    </div>
  );
}
