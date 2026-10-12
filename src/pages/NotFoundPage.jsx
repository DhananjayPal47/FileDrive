import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="container mx-auto min-h-[50vh] flex flex-col gap-6 items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404 — page not found</h1>
      <p className="text-gray-600">
        The page you were looking for does not exist.
      </p>
      <Button asChild>
        <Link to="/">Back home</Link>
      </Button>
    </main>
  );
}
