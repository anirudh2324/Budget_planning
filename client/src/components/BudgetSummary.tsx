import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Target,
  Calendar,
  Settings
} from "lucide-react";

interface BudgetSummaryProps {
  totalBudget: number;
  totalSpent: number;
  monthlyIncome: number;
  currency?: string;
  period?: string;
}

export default function BudgetSummary({ 
  totalBudget, 
  totalSpent, 
  monthlyIncome,
  currency = "$",
  period = "December 2024"
}: BudgetSummaryProps) {
  const remaining = totalBudget - totalSpent;
  const percentage = (totalSpent / totalBudget) * 100;
  const savingsRate = ((monthlyIncome - totalSpent) / monthlyIncome) * 100;
  const isOverBudget = totalSpent > totalBudget;

  const getStatusColor = () => {
    if (isOverBudget) return "destructive";
    if (percentage > 85) return "warning";
    if (percentage > 70) return "accent";
    return "primary";
  };

  const handleBudgetSettings = () => {
    console.log("Opening budget settings");
    // todo: remove mock functionality
  };

  const handleViewDetails = () => {
    console.log("Viewing detailed budget breakdown");
    // todo: remove mock functionality
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="budget-summary">
      {/* Total Budget Card */}
      <Card className="hover-elevate" data-testid="card-total-budget">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Monthly Budget
          </CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold" data-testid="text-total-budget">
              {currency}{totalBudget.toLocaleString()}
            </div>
            <Badge variant="outline" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {period}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Total Spent Card */}
      <Card className="hover-elevate" data-testid="card-total-spent">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Spent
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className={`text-2xl font-bold ${
              isOverBudget ? 'text-destructive' : 'text-foreground'
            }`} data-testid="text-total-spent">
              {currency}{totalSpent.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={getStatusColor() === "destructive" ? "destructive" : "secondary"}
                className="text-xs"
              >
                {percentage.toFixed(1)}% of budget
              </Badge>
              {isOverBudget && (
                <AlertTriangle className="h-4 w-4 text-destructive" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Remaining Budget Card */}
      <Card className="hover-elevate" data-testid="card-remaining-budget">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Remaining
          </CardTitle>
          {remaining > 0 ? (
            <TrendingUp className="h-4 w-4 text-primary" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className={`text-2xl font-bold ${
              remaining < 0 ? 'text-destructive' : 'text-primary'
            }`} data-testid="text-remaining-budget">
              {currency}{Math.abs(remaining).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {remaining < 0 ? 'Over budget' : 'Left to spend'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Savings Rate Card */}
      <Card className="hover-elevate" data-testid="card-savings-rate">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Savings Rate
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary" data-testid="text-savings-rate">
              {savingsRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {currency}{(monthlyIncome - totalSpent).toLocaleString()} saved
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Budget Progress Overview */}
      <Card className="md:col-span-2 lg:col-span-4 hover-elevate" data-testid="card-budget-progress">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
          <div>
            <CardTitle>Budget Progress</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track your spending against your monthly budget
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleViewDetails}
              data-testid="button-view-details"
            >
              View Details
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleBudgetSettings}
              data-testid="button-budget-settings"
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Budget Utilization</span>
              <span className="font-medium">
                {currency}{totalSpent.toLocaleString()} / {currency}{totalBudget.toLocaleString()}
              </span>
            </div>
            <Progress 
              value={Math.min(percentage, 100)} 
              className="h-3"
              data-testid="progress-budget-utilization"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {isOverBudget ? 
                  `${currency}${Math.abs(remaining).toLocaleString()} over budget` :
                  `${currency}${remaining.toLocaleString()} remaining`
                }
              </span>
              <span>{Math.min(percentage, 100).toFixed(1)}% used</span>
            </div>
          </div>
          
          {isOverBudget && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Budget Exceeded</span>
              </div>
              <p className="text-xs text-destructive/80 mt-1">
                You've spent {currency}{Math.abs(remaining).toLocaleString()} more than your monthly budget. 
                Consider reviewing your spending categories.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}