import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  onClick: () => void;
  className?: string;
  iconColor?: string;
}

export const ModuleCard = ({
  title,
  description,
  icon: Icon,
  badge,
  onClick,
  className,
  iconColor = "text-primary",
}: ModuleCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden cursor-pointer border-2 transition-all duration-300",
        "hover:border-primary hover:shadow-xl hover:-translate-y-2",
        "bg-gradient-to-br from-card to-card-hover",
        className
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 space-y-4">
        {/* Header with icon and badge */}
        <div className="flex items-start justify-between">
          <div className={cn(
            "p-3 rounded-xl transition-all duration-300",
            "bg-primary/5 group-hover:bg-primary/10 group-hover:scale-110"
          )}>
            <Icon className={cn("w-8 h-8", iconColor)} />
          </div>
          {badge && (
            <Badge variant="secondary" className="badge-accent">
              {badge}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Acessar módulo
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Card>
  );
};
