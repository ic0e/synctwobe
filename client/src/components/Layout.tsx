import { Outlet } from "react-router-dom";
//@ts-ignore
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main className="mx-auto max-w-[1600px] p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
}
