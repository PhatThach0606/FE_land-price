export const formatMoney = (value: number) => {
  if (!value) return "0 VNĐ";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export const formatArea = (area: number) => {
  if (!area) return "0 m²";
  return `${area} m²`;
};
