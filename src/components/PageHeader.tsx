import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  description?: string;
  showBack?: boolean;
}

export const PageHeader = ({ title, description, showBack = true }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 mb-8 animate-fade-in">
      {showBack && (
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="group -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Voltar ao Dashboard
        </Button>
      )}
      
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gradient-primary">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground max-w-3xl">
            {description}
          </p>
        )}
      </div>
      
      <div className="h-1 w-24 bg-gradient-accent rounded-full" />
    </div>
  );
};
