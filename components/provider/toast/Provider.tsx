import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};
export default function Provider({ children }: TProps) {
  return <div>{children}</div>;
}
