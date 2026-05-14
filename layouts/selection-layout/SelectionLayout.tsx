"use client";

export default function SelectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen bg-slate-900">{children}</main>;
}
