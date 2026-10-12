import { Outlet } from "react-router-dom";

import { SideNav } from "@/components/SideNav";

export function DashboardLayout() {
  return (
    <main className="container mx-auto pt-12 min-h-screen">
      <div className="flex gap-8">
        <SideNav />

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
