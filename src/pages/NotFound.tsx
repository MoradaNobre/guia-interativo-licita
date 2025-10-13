import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="text-center space-y-6 p-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-4">
          <span className="text-5xl font-extrabold text-primary">404</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Página não encontrada</h1>
        <p className="text-lg text-muted-foreground max-w-md">
          A página que você está procurando não existe ou foi movida.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-md"
        >
          Voltar para o Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
