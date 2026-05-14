import { landStyle, roadStyle } from "../map/utils/mapStyle";
import { handleLandClick } from "../map/Handlers/landHandler";
import { handleRoadClick } from "../map/Handlers/roadHandler";
const getZoomByArea = (area: number) => {};
let selectedLayer: any = null;

export const onEachFeature = (feature: any, layer: any) => {
  const type = feature?.properties?.type;
  const styleSet = type === "road" ? roadStyle : landStyle;

  // setDefault
  if (layer.setStyle) {
    layer.setStyle(styleSet.default);
  }

  layer.on({
    mouseover: () => {
      if (layer !== selectedLayer && layer.setStyle) {
        layer.setStyle(styleSet.hover);
      }
    },

    mouseout: () => {
      if (layer !== selectedLayer && layer.setStyle) {
        layer.setStyle(styleSet.default);
      }
    },

    click: async (e: any) => {
      if (selectedLayer && selectedLayer.setStyle && selectedLayer !== layer) {
        const oldType = selectedLayer.feature?.properties?.type;
        const oldStyle =
          oldType === "road" ? roadStyle.default : landStyle.default;

        selectedLayer.setStyle(oldStyle);
      }

      selectedLayer = layer;

      if (layer.setStyle) {
        layer.setStyle(styleSet.selected);
      }
      // Zoom
      if (type === "land" && layer.getBounds) {
        const bounds = layer.getBounds();
        const center = bounds.getCenter();

        const area = feature?.properties?.dien_tich;
        const zoom = getZoomByArea(area);

        layer._map?.flyTo(center, zoom, {
          duration: 0.5,
          easeLinearity: 0.25,
        });
      } else if (e?.latlng) {
        const bounds = layer.getBounds();
        const center = bounds.getCenter();
        const area = feature?.properties?.dien_tich;
        const zoom = getZoomByArea(area);

        layer._map?.flyTo(center, zoom, {
          duration: 0.8,
          easeLinearity: 0.8,
        });
      }

      // handler
      if (type === "land") {
        await handleLandClick(layer, e);
      } else if (type === "road") {
        await handleRoadClick(layer, e);
      }
    },
  });
};
