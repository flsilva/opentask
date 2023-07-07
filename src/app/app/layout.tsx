export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-screen flex-col bg-white">{children}</div>;
}
