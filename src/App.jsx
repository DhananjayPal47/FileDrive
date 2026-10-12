import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { DashboardLayout } from "@/components/DashboardLayout";
import { RequireAuth } from "@/components/RequireAuth";
import LandingPage from "@/pages/LandingPage";
import FilesPage from "@/pages/FilesPage";
import FavoritesPage from "@/pages/FavoritesPage";
import TrashPage from "@/pages/TrashPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <ConvexClientProvider>
        <Toaster />
        <Header />

        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Everything under /dashboard replaces the old Next.js middleware:
              the route tree itself is what requires a signed-in user. */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="/dashboard/files" replace />} />
            <Route path="files" element={<FilesPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="trash" element={<TrashPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />
      </ConvexClientProvider>
    </BrowserRouter>
  );
}
