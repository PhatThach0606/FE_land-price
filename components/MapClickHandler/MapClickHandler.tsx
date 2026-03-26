import { sendToBackend } from "./sendToBackend";

const getZoomByArea = (area: number) => {
  if (area < 500) return 20;
  if (500 < area && area < 8000) return 19;
  if (8000 < area && area < 15000) return 18;
  if (area < 10000) return 17;
  return 16;
};

let selectedLayer: any = null;
export const onEachFeature = (feature: any, layer: any) => {
  layer.on({
    click: async (e: any) => {
      const { lat, lng } = e.latlng;

      const res = await sendToBackend(lat, lng);

      if (!res || !res.features?.length) return;

      const feature = res.features[0];

      if (selectedLayer) {
        selectedLayer.setStyle({
          color: "black",
          weight: 2,
          fillColor: "green",
          fillOpacity: 0.5,
        });
      }

      selectedLayer = layer;

      layer.setStyle({
        color: "blue",
        weight: 3,
        fillColor: "blue",
        fillOpacity: 0.6,
      });

      // zoom Polygon
      const zoom = getZoomByArea(feature.properties?.[0]?.dien_tich);
      const bounds = layer.getBounds();
      const center = bounds.getCenter();
      const map = layer._map;
      map.flyTo(center, zoom, {
        duration: 0.5,
      });

      // popup
      const position = feature.position;
      const area = feature.properties?.[0]?.dien_tich;
      layer
        .bindPopup(
          `
          <b>Vị trí:</b> ${position} <br/>
          <b>Diện tích:</b> ${area} m² <br/>
          <b>Giá:</b> ${res.price}
        `,
        )
        .openPopup();
    },
  });
};
