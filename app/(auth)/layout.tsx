import { ReactNode } from "react";
import AuthLayout from "@/layouts/auth-layout/AuthLayout";
type TProps = {
  children: ReactNode;
};
export default function layout({ children }: TProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
