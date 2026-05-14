import SelectionLayout from "@/layouts/selection-layout/SelectionLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SelectionLayout>{children}</SelectionLayout>;
}
