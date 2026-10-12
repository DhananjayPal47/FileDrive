import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";

/**
 * Route guard for the dashboard. The Next.js version did this in
 * middleware.ts on the server; in a single page app the check happens
 * on the client instead.
 */
export function RequireAuth({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-8 w-full items-center mt-24">
        <Loader2 className="h-24 w-24 animate-spin text-gray-500" />
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return children;
}
