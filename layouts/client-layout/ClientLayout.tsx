"use client";
type TProps = {
  children: React.ReactNode;
};
import Sidebar from "@/components/sidebar-client/Sidebar";
export default function ClientLayout({ children }: TProps) {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
