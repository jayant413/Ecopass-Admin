export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-gray-100">
      {children}
    </div>
  );
}
