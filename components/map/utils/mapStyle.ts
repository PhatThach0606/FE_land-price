export const landStyle = {
  default: {
    color: "#1A1A1B",
    fillColor: "#F4A7B9",
    weight: 0.5,
    fillOpacity: 0.25,
  },

  hover: {
    color: "#3b82f6",
    weight: 2.5,
    fillColor: "#F4A7B9",
    fillOpacity: 0.35,
  },

  selected: {
    color: "#ec4899",
    weight: 3,
    fillColor: "#f472b6",
    fillOpacity: 0.8,
  },
};

export const roadStyle = {
  default: {
    color: "#F6C453",
    weight: 1,
    fillColor: "#F6C453",
    fillOpacity: 0.4,
  },

  hover: {
    color: "#3b82f6",
    weight: 2.5,
    fillColor: "#F6C453",
    fillOpacity: 0.35,
  },

  selected: {
    color: "#ec4899",
    weight: 3,
    fillColor: "#f472b6",
    fillOpacity: 0.8,
  },
};

export const getLandColor = (type: string) => {
  switch (type) {
    case "ODT":
      return "#FFA0FF";
    case "DTT":
      return "#FFA8A0";
    case "DVH":
      return "#FFA8A0";
    case "TMD":
      return "#FFA8A0";
    case "TSC":
      return "#FFA8A0";
    case "DKH":
      return "#FFA8A0";
    case "DKV":
      return "#FFA8A0";
    case "DGD":
      return "#FFA8A0";
    case "CQP":
      return "#FF6450";
    case "DGT":
      return "#FFAC30";
    default:
      return "FFA0FF";
  }
};
