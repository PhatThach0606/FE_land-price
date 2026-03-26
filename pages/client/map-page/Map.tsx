"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import BenThanh from "./BenThanh";
import Traffic from "./Traffic";
import LineString from "./LineString";
export default function Map() {
  const titleLayer = {
    title: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  };
  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={[10.7769, 106.7009]} // TP.HCM
        zoom={15}
        maxZoom={19}
        minZoom={15}
        style={{ height: "calc(100vh - 64px)", width: "100%", zIndex: 0 }}
      >
        <TileLayer attribution={titleLayer.attribution} url={titleLayer.url} />
        <BenThanh />
        <Traffic />
        <LineString />
      </MapContainer>
    </div>
  );
}
