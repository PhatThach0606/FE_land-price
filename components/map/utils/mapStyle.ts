export const getColor = (type: string) => {
  switch (type) {
    // =========================
    // ĐẤT NÔNG NGHIỆP
    // =========================

    case "LUC":
      return "#FFF68F";

    case "BHK":
      return "#F5DEB3";

    case "CLN":
      return "#FFD27F";

    case "NTS":
      return "#55FFFF";

    case "NKH":
      return "#E6FF99";

    // =========================
    // QUỐC PHÒNG - AN NINH
    // =========================

    case "CQP":
      return "#FF1493";

    case "CAN":
      return "#FF0066";

    // =========================
    // CÔNG NGHIỆP - THƯƠNG MẠI
    // =========================

    case "SKK":
      return "#FF7F7F";

    case "TMD":
      return "#FF9999";

    case "SKC":
      return "#FF6666";

    case "SKS":
      return "#C080FF";

    // =========================
    // VĂN HÓA - GIÁO DỤC
    // =========================

    case "DDT":
      return "#FF7F7F";

    case "DRA":
      return "#B266FF";

    case "ODT":
      return "#FF99FF";

    case "ONT":
      return "#FFD0FF";

    case "TSC":
      return "#FF8C8C";

    case "DTS":
      return "#FF9999";

    case "DGD":
      return "#FF6666";

    case "DYT":
      return "#FF8080";

    case "DVH":
      return "#FF7F7F";

    case "DTT":
      return "#FF6666";

    // =========================
    // HẠ TẦNG - CÔNG CỘNG
    // =========================

    case "DCH":
      return "#FFE066";

    case "DNL":
      return "#FF7F7F";

    case "DBV":
      return "#FF8080";

    case "DGT":
      return "#FFA830";

    case "DTL":
      return "#66FFFF";

    case "TON":
      return "#FF6666";

    case "NTD":
      return "#CCCCCC";

    case "DSH":
      return "#FF8080";

    case "DKV":
      return "#FF6666";

    case "TIN":
      return "#FF8080";

    // =========================
    // MẶT NƯỚC
    // =========================

    case "SON":
      return "#66FFFF";

    case "MNC":
      return "#66FFFF";

    // =========================
    // KHÁC
    // =========================

    case "PNK":
      return "#FF6666";

    case "BCS":
      return "#F5F5F5";

    // =========================
    // DEFAULT
    // =========================

    default:
      return "#CCCCCC";
  }
};
export const landStyle = {
  default: (loaiDat: string, settings?: any) => ({
    color: "#1A1A1B",
    fillColor: getColor(loaiDat),

    weight: settings?.landWeight ?? 0.5,
    fillOpacity: settings?.landFillOpacity ?? 1,
  }),

  hover: (loaiDat: string, settings?: any) => ({
    color: "#2563EB", // outline xanh
    fillColor: getColor(loaiDat),

    weight: (settings?.landWeight ?? 0.5) + 2,
    fillOpacity: settings?.landFillOpacity ?? 1,
  }),

  selected: (loaiDat: string, settings?: any) => ({
    color: "#1D4ED8", // outline đậm
    fillColor: "#93C5FD", // xanh biển nhạt (highlight)

    weight: (settings?.landWeight ?? 0.5) + 2,
    fillOpacity: 0.6,
  }),
};

export const roadStyle = {
  // Layer hiển thị gốc (Traffic) - Dạng Polygon khép kín
  default: (loaiDat: string, settings?: any) => ({
    color: getColor(loaiDat), // Màu của đường viền bao quanh đường
    fillColor: getColor(loaiDat), // 🔥 ĐÃ SỬA: Đổ màu lòng đường theo mã DGT
    weight: settings?.roadWeight ?? 0.5, // Polygon thì viền nên để mảnh (0.5) nhìn sẽ đẹp hơn
    opacity: 1,
    fillOpacity: settings?.roadFillOpacity ?? 1, // 🔥 ĐÃ SỬA: Đảm bảo lòng đường hiển thị rõ
  }),

  // Layer tương tác ẩn (TrafficLogic) - Dùng để hứng sự kiện click/hover
  logicDefault: () => ({
    color: "#000",
    fillColor: "#000",
    opacity: 0,
    fillOpacity: 0, // Ẩn hoàn toàn lòng đường của lớp logic
    weight: 1,
  }),

  // Khi rà chuột: Đoạn đường Polygon đó sẽ đổi màu viền sang xanh dương để highlight
  hover: (loaiDat: string, settings?: any) => ({
    color: "#2563EB", // Viền xanh dương lúc hover
    fillColor: getColor(loaiDat), // Giữ nguyên màu lòng đường DGT
    opacity: 1,
    fillOpacity: settings?.roadFillOpacity ?? 1,
    weight: (settings?.roadWeight ?? 0.5) + 2, // Làm đậm viền lên một chút
  }),

  // Khi click chọn: Đổi màu viền đậm hơn hoặc có thể highlight nhẹ lòng đường
  selected: (loaiDat: string, settings?: any) => ({
    color: "#1D4ED8", // Viền xanh đậm khi được chọn
    fillColor: "#93C5FD", // Khối lòng đường đổi sang màu xanh nhạt giống y như bên LAND cho đồng bộ
    opacity: 1,
    fillOpacity: 0.6,
    weight: (settings?.roadWeight ?? 0.5) + 2,
  }),
};

export const lineStyle = {
  default: (settings?: any) => ({
    color: "#FFA830", // Chuyển luôn màu mặc định của line sang cam DGT cho đồng bộ với đường dạng nét
    weight: settings?.lineWeight ?? 2,
    opacity: 1,
  }),

  hover: () => ({
    color: "#2563EB",
    weight: 4,
    opacity: 1,
  }),

  selected: () => ({
    color: "#93C5FD",
    weight: 5,
    opacity: 1,
  }),
};
