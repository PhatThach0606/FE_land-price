interface Props {
  page: number;
  totalPage: number;
  onPageChange: (p: number) => void;
  isLoading: boolean;
}

export default function Pagination({
  page,
  totalPage,
  onPageChange,
  isLoading,
}: Props) {
  // Logic tính toán các số trang cần hiển thị
  const getVisiblePages = () => {
    const delta = 1; // Hiển thị 1 trang bên trái và 1 trang bên phải của trang hiện tại
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPage; i++) {
      if (
        i === 1 ||
        i === totalPage ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  if (totalPage <= 1) return null;

  return (
    <div className="px-6 py-4 bg-slate-900/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Thông tin trang */}
      <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold order-2 sm:order-1">
        Trang <span className="text-indigo-400">{page}</span> trên tổng{" "}
        <span className="text-slate-300">{totalPage}</span>
      </div>

      {/* Điều hướng */}
      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        <button
          disabled={page === 1 || isLoading}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-2 text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          Trước
        </button>

        <div className="flex items-center gap-1">
          {getVisiblePages().map((p, index) => (
            <button
              key={index}
              disabled={p === "..." || isLoading}
              onClick={() => typeof p === "number" && onPageChange(p)}
              className={`min-w-[36px] h-9 text-xs font-bold rounded-lg transition-all ${
                p === page
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400"
                  : p === "..."
                    ? "text-slate-600 cursor-default"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent hover:border-slate-700"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPage || isLoading}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-2 text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
