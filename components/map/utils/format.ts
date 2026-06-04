type FormatOptions = {
  maxUnits?: number; // giới hạn số cấp hiển thị (default = 2)
  useShortUnit?: boolean; // true = tỷ / triệu / nghìn
};
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

export const formatMoneyShort = (
  value: number,
  options: FormatOptions = {},
) => {
  if (value === null || value === undefined || isNaN(value)) return "0";

  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  const BILLION = 1_000_000_000;
  const MILLION = 1_000_000;
  const THOUSAND = 1_000;

  const parts: string[] = [];

  const billion = Math.floor(abs / BILLION);
  const million = Math.floor((abs % BILLION) / MILLION);
  const thousand = Math.floor((abs % MILLION) / THOUSAND);

  if (billion > 0) parts.push(`${billion} tỷ`);
  if (million > 0) parts.push(`${million} triệu`);
  if (thousand > 0) parts.push(`${thousand} nghìn`);

  // fallback nếu toàn 0
  if (parts.length === 0) return "0";

  // giới hạn số unit hiển thị (UI gọn)
  const limited = options.maxUnits ? parts.slice(0, options.maxUnits) : parts;

  return sign + limited.join(" ");
};
export const formatMoneyCompact = (value: number) => {
  if (!value || isNaN(value)) return "0";

  const abs = Math.abs(value);

  if (abs >= 1_000_000_000) {
    return (abs / 1_000_000_000).toFixed(2).replace(/\.?0+$/, "") + " tỷ";
  }

  if (abs >= 1_000_000) {
    return (abs / 1_000_000).toFixed(2).replace(/\.?0+$/, "") + " triệu";
  }

  if (abs >= 1_000) {
    return (abs / 1_000).toFixed(0) + " nghìn";
  }

  return abs.toString();
};
