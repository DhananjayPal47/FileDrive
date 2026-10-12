import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div className="h-40 bg-gray-100 mt-12 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div>FileDrive</div>

        <Link className="text-blue-900 hover:text-blue-500" to="/privacy">
          Privacy Policy
        </Link>
        <Link
          className="text-blue-900 hover:text-blue-500"
          to="/terms-of-service"
        >
          Terms of Service
        </Link>
        <Link className="text-blue-900 hover:text-blue-500" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}
