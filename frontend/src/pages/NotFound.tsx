import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center p-12 bg-surface rounded-3xl shadow-md border border-border">
        <h1 className="mb-6 text-7xl font-bold font-heading text-foreground">404</h1>
        <p className="mb-8 text-2xl text-muted-foreground">Oops! Page not found.</p>
        <a href="/" className="inline-block text-lg font-semibold bg-primary text-primary-foreground px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
