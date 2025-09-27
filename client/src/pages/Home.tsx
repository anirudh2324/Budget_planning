import BudgetSummary from "@/components/BudgetSummary";
import BudgetCard from "@/components/BudgetCard";
import TransactionItem from "@/components/TransactionItem";
import ExpenseChart from "@/components/ExpenseChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  // todo: remove mock functionality
  const budgetData = [
    { category: "Food & Dining", spent: 850, budget: 1000, trend: "up" as const, trendPercentage: 12 },
    { category: "Shopping", spent: 450, budget: 600, trend: "down" as const, trendPercentage: 8 },
    { category: "Transportation", spent: 320, budget: 400, trend: "up" as const, trendPercentage: 5 },
    { category: "Bills & Utilities", spent: 1200, budget: 1000 },
  ];

  const recentTransactions = [
    {
      id: "1",
      description: "Starbucks Coffee",
      amount: 4.85,
      category: "Food & Dining",
      date: "2024-01-15",
      merchant: "Starbucks",
      confidence: 95,
    },
    {
      id: "2",
      description: "Amazon Purchase",
      amount: 129.99,
      category: "Shopping",
      date: "2024-01-14",
      merchant: "Amazon",
      confidence: 88,
    },
    {
      id: "3",
      description: "Uber Ride",
      amount: 22.50,
      category: "Transportation",
      date: "2024-01-14",
      merchant: "Uber",
      confidence: 92,
    },
  ];

  const pieChartData = {
    labels: ['Food & Dining', 'Shopping', 'Transportation', 'Bills & Utilities'],
    datasets: [{
      data: [850, 450, 320, 1200],
      backgroundColor: [
        'hsl(145, 63%, 49%)', // primary
        'hsl(204, 70%, 53%)', // accent  
        'hsl(283, 39%, 53%)', // insight purple
        'hsl(4, 90%, 58%)',   // warning
      ],
      borderWidth: 2,
    }]
  };

  return (
    <div className="space-y-8 p-6" data-testid="page-home">
      {/* Budget Overview */}
      <section>
        <BudgetSummary
          totalBudget={5000}
          totalSpent={3820}
          monthlyIncome={6500}
          period="December 2024"
        />
      </section>

      {/* Budget Categories and Quick Overview Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Categories */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Budget Categories</h2>
            <Link href="/analysis">
              <Button variant="outline" size="sm" data-testid="link-view-all-categories">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgetData.map((budget) => (
              <BudgetCard
                key={budget.category}
                category={budget.category}
                spent={budget.spent}
                budget={budget.budget}
                trend={budget.trend}
                trendPercentage={budget.trendPercentage}
              />
            ))}
          </div>
        </div>

        {/* Quick Chart Overview */}
        <div className="space-y-4">
          <ExpenseChart
            type="pie"
            title="Current Month"
            data={pieChartData}
            totalAmount={2820}
            period="December 2024"
            showDownload={false}
          />
        </div>
      </div>

      {/* Recent Transactions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Link href="/analysis">
            <Button variant="outline" size="sm" data-testid="link-view-all-transactions">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentTransactions.map((transaction, index) => (
                <div key={transaction.id} className={index !== 0 ? "border-t" : ""}>
                  <div className="p-4">
                    <TransactionItem {...transaction} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/upload">
            <Card className="hover-elevate cursor-pointer" data-testid="card-upload-transactions">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-base">Upload Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Upload bank statements or paste transaction text for AI categorization
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/analysis">
            <Card className="hover-elevate cursor-pointer" data-testid="card-analyze-spending">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-base">Analyze Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Review categorized expenses and spending patterns
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/reports">
            <Card className="hover-elevate cursor-pointer" data-testid="card-view-reports">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-base">View Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Generate detailed financial reports and insights
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}