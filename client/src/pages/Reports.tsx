import { useState } from "react";
import ExpenseChart from "@/components/ExpenseChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  PieChart,
  BarChart3
} from "lucide-react";

export default function Reports() {
  const [reportType, setReportType] = useState("monthly");
  const [dateRange, setDateRange] = useState("6months");

  // todo: remove mock functionality
  const monthlyData = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      data: [2800, 3200, 2900, 3400, 3100, 3090],
      backgroundColor: [
        'hsl(145, 63%, 49%)',
        'hsl(204, 70%, 53%)',
        'hsl(283, 39%, 53%)',
        'hsl(4, 90%, 58%)',
        'hsl(43, 89%, 38%)',
        'hsl(145, 63%, 49%)',
      ],
      borderWidth: 2,
    }]
  };

  const categoryData = {
    labels: ['Food & Dining', 'Shopping', 'Transportation', 'Bills & Utilities', 'Entertainment', 'Healthcare'],
    datasets: [{
      data: [942, 580, 388, 1200, 232, 150],
      backgroundColor: [
        'hsl(145, 63%, 49%)',
        'hsl(204, 70%, 53%)', 
        'hsl(283, 39%, 53%)',
        'hsl(4, 90%, 58%)',
        'hsl(43, 89%, 38%)',
        'hsl(210, 17%, 90%)',
      ],
      borderWidth: 2,
    }]
  };

  const insights = [
    {
      title: "Highest Spending Category",
      value: "Bills & Utilities",
      amount: "$1,200",
      trend: "up",
      percentage: 2,
      description: "2% increase from last month"
    },
    {
      title: "Average Daily Spending", 
      value: "$102.58",
      amount: "",
      trend: "down",
      percentage: 8,
      description: "8% decrease from last month"
    },
    {
      title: "Budget Adherence",
      value: "76.4%",
      amount: "",
      trend: "up",
      percentage: 5,
      description: "5% improvement from last month"
    },
    {
      title: "Savings Rate",
      value: "23.6%",
      amount: "$1,530",
      trend: "up",
      percentage: 12,
      description: "12% increase from last month"
    }
  ];

  const handleExportReport = () => {
    console.log("Exporting report for:", reportType, dateRange);
    // todo: remove mock functionality
  };

  const handleShareReport = () => {
    console.log("Sharing report");
    // todo: remove mock functionality
  };

  return (
    <div className="space-y-6 p-6" data-testid="page-reports">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and visual analysis of your spending patterns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShareReport} data-testid="button-share-report">
            Share Report
          </Button>
          <Button onClick={handleExportReport} data-testid="button-export-report">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Report Controls */}
      <Card data-testid="report-controls">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Report Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger data-testid="select-report-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Overview</SelectItem>
                  <SelectItem value="category">Category Analysis</SelectItem>
                  <SelectItem value="trends">Spending Trends</SelectItem>
                  <SelectItem value="budget">Budget Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger data-testid="select-date-range">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 months</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                  <SelectItem value="allyear">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => console.log("Refreshing report data")}
                data-testid="button-refresh-data"
              >
                Refresh Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="hover-elevate" data-testid={`insight-${index}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {insight.title}
              </CardTitle>
              <div className="p-1 rounded-full">
                {insight.trend === "up" ? (
                  <TrendingUp className={`h-4 w-4 ${
                    insight.title.includes("Savings") || insight.title.includes("Budget") 
                      ? "text-primary" : "text-destructive"
                  }`} />
                ) : (
                  <TrendingDown className={`h-4 w-4 ${
                    insight.title.includes("Spending") 
                      ? "text-primary" : "text-destructive"
                  }`} />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold" data-testid={`text-insight-value-${index}`}>
                {insight.value}
              </div>
              {insight.amount && (
                <div className="text-sm text-muted-foreground">
                  {insight.amount}
                </div>
              )}
              <Badge
                variant={insight.trend === "up" ? "default" : "secondary"}
                className="text-xs"
              >
                {insight.description}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart
          type="bar"
          title="Monthly Spending Trend"
          data={monthlyData}
          totalAmount={18590}
          period="Last 6 Months"
        />
        
        <ExpenseChart
          type="pie"
          title="Spending by Category"
          data={categoryData}
          totalAmount={3492}
          period="December 2024"
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Summary */}
        <Card className="hover-elevate" data-testid="spending-summary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Spending Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Expenses</span>
                <span className="font-medium">$3,492</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Average per day</span>
                <span className="font-medium">$112.65</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Largest expense</span>
                <span className="font-medium">$1,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total transactions</span>
                <span className="font-medium">67</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Performance */}
        <Card className="hover-elevate" data-testid="budget-performance">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Budget Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Budget used</span>
                <span className="font-medium">76.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Categories on track</span>
                <span className="font-medium">4 of 6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Over budget</span>
                <span className="font-medium text-destructive">1 category</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Money saved</span>
                <span className="font-medium text-primary">$1,508</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card className="hover-elevate" data-testid="top-categories">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Top Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Bills & Utilities", amount: 1200, percentage: 34.4 },
              { name: "Food & Dining", amount: 942, percentage: 27.0 },
              { name: "Shopping", amount: 580, percentage: 16.6 },
            ].map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium">{category.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {category.percentage}% of total
                  </div>
                </div>
                <div className="text-sm font-medium">
                  ${category.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}