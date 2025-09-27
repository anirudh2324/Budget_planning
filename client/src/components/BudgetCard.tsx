import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

interface BudgetCardProps {
  category: string;
  spent: number;
  budget: number;
  currency?: string;
  trend?: "up" | "down";
  trendPercentage?: number;
}

export default function BudgetCard({ 
  category, 
  spent, 
  budget, 
  currency = "₹", 
  trend, 
  trendPercentage 
}: BudgetCardProps) {
  const percentage = Math.min((spent / budget) * 100, 100);
  const remaining = Math.max(budget - spent, 0);
  const isOverBudget = spent > budget;
  
  const getStatusColor = () => {
    if (isOverBudget) return "destructive";
    if (percentage > 80) return "warning";
    if (percentage > 60) return "accent";
    return "primary";
  };

  const getStatusIcon = () => {
    if (isOverBudget) return <AlertTriangle className="h-4 w-4" />;
    if (percentage > 80) return <AlertTriangle className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  const statusColor = getStatusColor();

  return (
    <Card className="hover-elevate" data-testid={`budget-card-${category.toLowerCase()}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
        <CardTitle className="text-base font-medium">{category}</CardTitle>
        <Badge 
          variant={statusColor === "destructive" ? "destructive" : "secondary"}
          className="text-xs"
        >
          {percentage.toFixed(0)}%
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Amount Display */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Spent</span>
            <span className={`font-medium ${isOverBudget ? 'text-destructive' : 'text-foreground'}`}>
              {currency}{spent.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Budget</span>
            <span className="text-muted-foreground">
              {currency}{budget.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress 
            value={percentage} 
            className="h-2"
            data-testid={`progress-${category.toLowerCase()}`}
          />
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {currency}{remaining.toLocaleString()} remaining
            </span>
            {trend && trendPercentage && (
              <div className={`flex items-center gap-1 ${
                trend === "up" ? "text-destructive" : "text-primary"
              }`}>
                {trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{trendPercentage}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded-full ${
            statusColor === "destructive" ? "bg-destructive/10 text-destructive" :
            statusColor === "warning" ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400" :
            statusColor === "accent" ? "bg-accent/10 text-accent" :
            "bg-primary/10 text-primary"
          }`}>
            {getStatusIcon()}
          </div>
          <span className="text-xs text-muted-foreground">
            {isOverBudget ? "Over budget" :
             percentage > 80 ? "Near limit" :
             percentage > 60 ? "On track" :
             "Under budget"}
          </span>
        </div>

        {/* Action Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => console.log(`View details for ${category}`)}
          data-testid={`button-view-${category.toLowerCase()}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}