import Navbar from "./Navbar";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-bgBase text-textPrimary">
      <Navbar />
      <main className="px-6 py-6">{children}</main>
    </div>
  );
}