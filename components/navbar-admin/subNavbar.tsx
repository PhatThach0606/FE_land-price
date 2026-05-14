// Helper component cho Input để tái sử dụng style
const SearchInput = ({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full bg-transparent border-none outline-none text-sm text-slate-100 placeholder:text-slate-500 px-2 py-1 focus:ring-0"
  />
);

export default SearchInput;
