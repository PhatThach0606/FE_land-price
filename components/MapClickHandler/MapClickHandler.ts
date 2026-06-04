import { landStyle, roadStyle } from "../map/utils/mapStyle";
import { handleLandClick } from "../map/Handlers/landHandler";
import { handleRoadClick } from "../map/Handlers/roadHandler";
import * as turf from "@turf/turf";

const getZoomByArea = (area: number) => {
  if (!area) return 18;
  if (area < 50) return 20;
  if (area < 100) return 19;
  if (area < 300) return 18;
  if (area < 1000) return 17;
  return 16;
};

// =========================
// GLOBAL STATE SAFE
// =========================
const selectedLayer: {
  land: any;
  road: any;
} = {
  land: null,
  road: null,
};

export const currentStyleSettings = {
  current: null as any,
};

// =========================
// HELPERS OPTIMIZED
// =========================
const snapToPolygonEdge = (coords: any, latlng: any) => {
  try {
    const polygon = turf.polygon(coords);
    const line = turf.polygonToLine(polygon);
    const point = turf.point([latlng.lng, latlng.lat]);

    const snapped = turf.nearestPointOnLine(line, point);

    return {
      lat: snapped.geometry.coordinates[1],
      lng: snapped.geometry.coordinates[0],
    };
  } catch (err) {
    return latlng;
  }
};

/**
 * Hàm kiểm tra xem vị trí click có cần phải di chuyển bản đồ không.
 * Nếu vị trí click nằm quá gần viền màn hình (cách viền dưới 150px) thì mới di chuyển nhẹ, tránh giật hình.
 */
const smoothPanIfNeeded = (map: any, latlng: any) => {
  if (!map || !latlng) return;

  const containerPoint = map.latLngToContainerPoint(latlng);
  const size = map.getSize();
  const padding = 150; // Vùng đệm an toàn tính bằng pixel

  const isNearEdge =
    containerPoint.x < padding ||
    containerPoint.x > size.x - padding ||
    containerPoint.y < padding ||
    containerPoint.y > size.y - padding;

  if (isNearEdge) {
    map.panTo(latlng, { animate: true, duration: 0.4 });
  }
};

// =========================
// MAIN HANDLER
// =========================
export const onEachFeature =
  (styleSettings: any) => (feature: any, layer: any) => {
    currentStyleSettings.current = styleSettings;

    const type = feature?.properties?.type;
    const loaiDat = feature?.properties?.loai_dat;

    const getStyle = (mode: "default" | "hover" | "selected") => {
      const settings = currentStyleSettings.current || styleSettings;

      // ================= ROAD =================
      if (type === "road") {
        if (mode === "hover") return roadStyle.hover();
        if (mode === "selected") return roadStyle.selected();
        return roadStyle.logicDefault();
      }

      // ================= LAND =================
      if (mode === "hover") return landStyle.hover(loaiDat, settings);
      if (mode === "selected") return landStyle.selected(loaiDat, settings);
      return landStyle.default(loaiDat, settings);
    };

    layer.setStyle(getStyle("default"));
    layer.off("mouseover mouseout click");

    // =========================
    // HOVER EFFECT
    // =========================
    layer.on({
      mouseover: () => {
        const isSelected =
          type === "land"
            ? selectedLayer.land === layer
            : selectedLayer.road === layer;

        if (!isSelected) {
          layer.setStyle(getStyle("hover"));
        }
      },

      mouseout: () => {
        const isSelected =
          type === "land"
            ? selectedLayer.land === layer
            : selectedLayer.road === layer;

        if (!isSelected) {
          layer.setStyle(getStyle("default"));
        }
      },

      // =========================
      // CLICK OPTIMIZED (NO JITTER)
      // =========================
      click: async (e: any) => {
        const map = layer._map;

        // =====================================================
        // LAND CLICK
        // =====================================================
        if (type === "land") {
          const prev = selectedLayer.land;

          if (prev && prev !== layer) {
            const old = prev.feature;
            prev.setStyle(
              landStyle.default(
                old?.properties?.loai_dat,
                currentStyleSettings.current,
              ),
            );
          }

          selectedLayer.land = layer;
          layer.setStyle(getStyle("selected"));

          const bounds = layer.getBounds();
          const center = bounds.getCenter();
          const currentZoom = map?.getZoom() || 18;
          const targetZoom = getZoomByArea(feature?.properties?.dien_tich);

          // Chỉ flyTo nếu zoom hiện tại khác biệt hoặc tâm lệch quá xa viền màn hình
          if (currentZoom !== targetZoom) {
            map?.flyTo(center, targetZoom, { duration: 0.4 });
          } else {
            smoothPanIfNeeded(map, center);
          }

          await handleLandClick(layer, e);
          return;
        }

        // =====================================================
        // ROAD CLICK (SMOOTH & SNAP)
        // =====================================================
        if (type === "road") {
          const coords = feature?.geometry?.coordinates;
          let latlng = e?.latlng;

          if (coords && latlng) {
            latlng = snapToPolygonEdge(coords, latlng);
          }

          // RESET PREVIOUS ROAD
          const prev = selectedLayer.road;
          if (prev && prev !== layer) {
            prev.setStyle(roadStyle.logicDefault());
          }

          selectedLayer.road = layer;
          layer.setStyle(roadStyle.selected());

          // Thay vì ép flyTo(18) giật đứng góc nhìn, ta trượt nhẹ nhàng (panTo)
          // nếu điểm bấm nằm khuất sau các viền bản đồ hoặc popup sắp hiện.
          smoothPanIfNeeded(map, latlng);

          await handleRoadClick(layer, { ...e, latlng });
          return;
        }
      },
    });
  };
