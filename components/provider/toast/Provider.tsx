import { ReactNode } from "react";
import {ThemeProvider} from "next-themes"
type TProps = {
  children: ReactNode;
};
export default function Provider({ children }: TProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
