export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-[#0000ff] flex flex-col min-h-screen">
      {children}
    </main>
  );
}
